'use client';

import { Alert, Pagination } from 'flowbite-react';
import { ChangeEvent, useEffect, useState } from 'react';
// import type { GetAllSchemaListParameter, PaginationData } from '../../../interfaces';
import { apiStatusCodes, storageKeys } from '../../../config/CommonConstant';
import { getAllSchemas, getAllSchemasByOrgId } from '../../../api/Schema';

import type { AxiosResponse } from 'axios';
import BreadCrumbs from '../../BreadCrumbs';
import CustomSpinner from '../../CustomSpinner';
import { EmptyListMessage } from '../../EmptyListComponent';
import { Features } from '../../../utils/enums/features';
import RoleViewButton from '../../RoleViewButton';
import SchemaCard from '../../../commonComponents/SchemaCard';
import type { SchemaDetails } from '../../Verification/interface';
import SearchInput from '../../SearchInput';
import { getFromLocalStorage } from '../../../api/Auth';
import { pathRoutes } from '../../../config/pathRoutes';
import { getOrganizationById } from '../../../api/organization';
import checkEcosystem from '../../../config/ecosystem';
import type { GetAllSchemaListParameter } from '../../Resources/Schema/interfaces';

const EndorsementList = () => {
    const [schemaList, setSchemaList] = useState([])
    const [schemaListErr, setSchemaListErr] = useState<string | null>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [allSchemaFlag, setAllSchemaFlag] = useState<boolean>(false)
    const [orgId, setOrgId] = useState<string>('')
    const [schemaListAPIParameter, setSchemaListAPIParameter] = useState({
        itemPerPage: 9,
        page: 1,
        search: "",
        sortBy: "id",
        sortingOrder: "DESC",
        allSearch: ""
    })
    const [walletStatus, setWalletStatus] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const getSchemaList = async (schemaListAPIParameter: GetAllSchemaListParameter, flag: boolean) => {
        try {
            const organizationId = await getFromLocalStorage(storageKeys.ORG_ID);
            setOrgId(organizationId);
            setLoading(true);
            let schemaList
            if (allSchemaFlag) {
                schemaList = await getAllSchemas(schemaListAPIParameter);
            } else {
                schemaList = await getAllSchemasByOrgId(schemaListAPIParameter, organizationId);
            }
            const { data } = schemaList as AxiosResponse;
            if (schemaList === 'Schema records not found') {
                setLoading(false);
                setSchemaList([]);
            }

            if (data?.statusCode === apiStatusCodes.API_STATUS_SUCCESS) {
                if (data?.data?.data) {
                    setTotalItem(data?.data.totalItems)
                    setSchemaList(data?.data?.data);
                    setLoading(false);
                } else {
                    setLoading(false);
                    if (schemaList !== 'Schema records not found') {
                        setSchemaListErr(schemaList as string)

                    }
                }
            } else {
                setLoading(false);
                if (schemaList !== 'Schema records not found') {
                    setSchemaListErr(schemaList as string)

                }
            }
            setTimeout(() => {
                setSchemaListErr('')
            }, 3000)
        } catch (error) {
            console.error('Error while fetching schema list:', error);
            setLoading(false);

        }
    };

    useEffect(() => {
        getSchemaList(schemaListAPIParameter, false)

    }, [schemaListAPIParameter, allSchemaFlag])

    const onSearch = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.preventDefault()
        getSchemaList({
            ...schemaListAPIParameter,
            search: event.target.value
        }, false)

        if (allSchemaFlag) {
            getSchemaList({
                ...schemaListAPIParameter,
                allSearch: event.target.value
            }, false)
        }

    }

    const requestSelectionCallback = (schemaId: string, attributes: string[], issuerId: string, created: string) => {
        const schemaDetails = {
            attribute: attributes,
            issuerDid: issuerId,
            createdDate: created,
            schemaId
        }
        console.log("Selected request data::", schemaDetails)
        // props.schemaSelectionCallback(schemaId, schemaDetails)
    }
    const options = ["All", "Approved", "Requested", "Rejected"]

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Handle filter", e.target.value)
        if (e.target.value === 'All schemas') {
            setAllSchemaFlag(true)
        }
        else {
            setAllSchemaFlag(false)
            getSchemaList(schemaListAPIParameter, false)
        }
    };

    const fetchOrganizationDetails = async () => {
        setLoading(true)
        const orgId = await getFromLocalStorage(storageKeys.ORG_ID)
        const response = await getOrganizationById(orgId);
        const { data } = response as AxiosResponse
        if (data?.statusCode === apiStatusCodes.API_STATUS_SUCCESS) {
            if (data?.data?.org_agents && data?.data?.org_agents?.length > 0) {
                setWalletStatus(true)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchOrganizationDetails()
    }, [])

    const { isEcosystemMember } = checkEcosystem()
    // const createSchemaTitle = isEcosystemMember ? "Request Endorsement" : "Create"
    // isEcosystemMember ? "Request Endorsement" : "Create"
    return (
        <div className="px-4 pt-6">
            <div className="mb-4 col-span-full xl:mb-2">
                <BreadCrumbs />
                <h1 className="ml-1 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    Endorsement Details
                </h1>
            </div>
            <div>
                <div
                    className=""
                >
                    <div className="flex flex-col items-center justify-between mb-4 pr-4 sm:flex-row">
                        <div id='schemasSearchInput' className='mb-2 pl-2 flex space-x-2 items-end'>
                            <SearchInput
                                onInputChange={onSearch}
                            />
                            <select onChange={handleFilter} id="schamfilter"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11">
                                {/* <option selected>Organization's schema</option> */}
                                {options.map((opt) => (
                                    <option
                                        key={opt}
                                        className=""
                                        value={opt}
                                    >
                                        {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                {
                    schemaListErr &&
                    <Alert
                        color="failure"
                        onDismiss={() => setSchemaListErr(null)}
                    >
                        <span>
                            <p>
                                {schemaListErr}
                            </p>
                        </span>
                    </Alert>
                }
                {loading
                    ? (<div className="flex items-center justify-center mb-4">
                        <CustomSpinner />
                    </div>)
                    :
                    schemaList && schemaList.length > 0 ? (
                        <div className='Flex-wrap' style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="mt-1 grid w-full grid-cols-1 gap-4 mt-0 mb-4 xl:grid-cols-2 2xl:grid-cols-3">
                                {schemaList && schemaList.length > 0 &&
                                    schemaList.map((element, index) => (
                                        <div className='p-2' key={`endorsement-cards${index}`}>
                                            <SchemaCard fromEndorsementList={true} schemaName={element['name']} version={element['version']} schemaId={element['schemaLedgerId']} issuerDid={element['issuerId']} attributes={element['attributes']} created={element['createDateTime']}
                                                onClickCallback={requestSelectionCallback} status={index === 1 ? "approved" : index === 2 ? "requested" : "rejected"} />
                                        </div>
                                    ))}
                            </div>
                            <div className="flex items-center justify-end mb-4" id="schemasPagination">

                                {schemaList.length > 0 && (<Pagination
                                    currentPage={schemaListAPIParameter?.page}
                                    onPageChange={(page) => {
                                        setSchemaListAPIParameter(prevState => ({
                                            ...prevState,
                                            page: page
                                        }));
                                    }}
                                    totalPages={Math.ceil(totalItem / schemaListAPIParameter?.itemPerPage)}
                                />)}
                            </div>
                        </div>) : (
                        <div>
                            {walletStatus ?
                                <EmptyListMessage
                                    message={'No Schemas'}
                                    description={'Get started by creating a new Schema'}
                                    buttonContent={'Create Schema'}
                                    svgComponent={<svg className='pr-2 mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="15" fill="none" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M21.89 9.89h-7.78V2.11a2.11 2.11 0 1 0-4.22 0v7.78H2.11a2.11 2.11 0 1 0 0 4.22h7.78v7.78a2.11 2.11 0 1 0 4.22 0v-7.78h7.78a2.11 2.11 0 1 0 0-4.22Z" />
                                    </svg>}
                                    onClick={() => {
                                        window.location.href = `${pathRoutes.organizations.createSchema}?OrgId=${orgId}`
                                    }}
                                />
                                :
                                <EmptyListMessage
                                    message={'No Wallet'}
                                    description={'Get started by creating a Wallet'}
                                    buttonContent={'Create Wallet'}
                                    svgComponent={<svg className='pr-2 mr-1' xmlns="http://www.w3.org/2000/svg" width="24" height="15" fill="none" viewBox="0 0 24 24">
                                        <path fill="#fff" d="M21.89 9.89h-7.78V2.11a2.11 2.11 0 1 0-4.22 0v7.78H2.11a2.11 2.11 0 1 0 0 4.22h7.78v7.78a2.11 2.11 0 1 0 4.22 0v-7.78h7.78a2.11 2.11 0 1 0 0-4.22Z" />
                                    </svg>}
                                    onClick={() => {
                                        window.location.href = `${pathRoutes.organizations.dashboard}?OrgId=${orgId}`
                                    }}
                                />}

                        </div>
                    )
                }
            </div>
        </div>


    )
}


export default EndorsementList
