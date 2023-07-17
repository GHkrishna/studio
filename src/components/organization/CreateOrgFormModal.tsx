import * as yup from "yup"

import { Avatar, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { IMG_MAX_HEIGHT, IMG_MAX_WIDTH, imageSizeAccepted } from '../../config/CommonConstant'
import { MouseEvent, useState } from "react";
import { asset, url } from '../../lib/data.js';
import { calculateSize, dataURItoBlob } from "../../utils/CompressImage";
import { useEffect, useRef, useState } from "react";

import type { AxiosResponse } from 'axios';
import { asset } from '../../lib/data.js';
import { createOrganization } from "../../api/organization";

interface Values {
    name: string;
    description: string;
}

interface ILogoImage {
    logoFile: string | File
    imagePreviewUrl: string | ArrayBuffer | null | File,
    fileName: string
}


const CreateOrgFormModal = (props: { openModal: boolean; setOpenModal: (flag: boolean) => void }) => {


    const [logoImage, setLogoImage] = useState<ILogoImage>({
        logoFile: "",
        imagePreviewUrl: "",
        fileName:''
    })

    const [isImageEmpty, setIsImageEmpty] = useState(true)


    const [imgError, setImgError] = useState('')

    const [selectedImage, setSelectedImage] = useState(null);

    const [fileSizeError, setFileSizeError] = useState('');


    useEffect(() => {
        setOrgData({
            name: '',
            description: '',
        })
        setLogoImage({
            logoFile: "",
            imagePreviewUrl: ""
        })
    }, [props.openModal])


    const ProcessImg = (e: any): string | undefined => {

        const file = e?.target.files[0]
        if (!file) { return }

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = (event): void => {
            const imgElement = document.createElement("img")
            if (imgElement) {
                imgElement.src = typeof event?.target?.result === 'string' ? event.target.result : ""
                imgElement.onload = (e): void => {
                    let fileUpdated: File | string = file
                    let srcEncoded = ''
                    const canvas = document.createElement("canvas")

                    const { width, height, ev } = calculateSize(imgElement, IMG_MAX_WIDTH, IMG_MAX_HEIGHT)
                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext("2d")
                    if (ctx && e?.target) {
                        ctx.imageSmoothingEnabled = true
                        ctx.imageSmoothingQuality = "high"
                        ctx.drawImage(ev, 0, 0, canvas.width, canvas.height)
                        srcEncoded = ctx.canvas.toDataURL(ev, file.type)
                        const blob = dataURItoBlob(srcEncoded, file.type)
                        fileUpdated = new File([blob], file.name, { type: file.type, lastModified: new Date().getTime() })
                        setLogoImage({
                            logoFile: fileUpdated,
                            imagePreviewUrl: srcEncoded,
                            fileName: file.name
                        })
                    }
                }
            }
        }
    }

    const isEmpty = (object: any): boolean => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, guard-for-in
        for (const property in object) {
            setIsImageEmpty(false)
            return false
        }
        setIsImageEmpty(true)
        return true
    }


    const handleImageChange = (event: any): void => {
        setImgError("")
        const reader = new FileReader()
        const file = event?.target?.files[0]

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/svg', 'image/png'];

        if (file) {
            if (file.size <= 1 * 1024 * 1024) { // 1MB in bytes
                if (allowedTypes.includes(file.type)) {
              setSelectedImage(file.name);
              setFileSizeError("");
            } else {
              setSelectedImage(null);
              setFileSizeError('Invalid file format.Only JPG, SVG and PNG files are accepted.');
            }
          } else {
            setSelectedImage(null);
            setFileSizeError('File size cannot exceed 1 MB.');
          }
         } else {
            setSelectedImage(null);
            setFileSizeError("");
          }

        setSelectedImage(file ? file.name : null);
        console.log(file);

        const fieSize = Number((file[0]?.size / 1024 / 1024)?.toFixed(2))
        const extension = file[0]?.name?.substring(file[0]?.name?.lastIndexOf(".") + 1)?.toLowerCase()
        if (extension === "png" || extension === "jpeg" || extension === "jpg" ||extension === "svg") {
            if (fieSize <= imageSizeAccepted) {
                reader.onloadend = (): void => {
                    ProcessImg(event)
                    isEmpty(reader.result)
                }
                reader.readAsDataURL(file[0])
                event.preventDefault()
            } else {
                setImgError("Please check image size.")
            }
        } else {
            setImgError("Invalid image type.")
        }
    }

    const sumitCreateOrganization = async (values: Values) => {
        setLoading(true)

        const orgData = {
            name: values.name,
            description: values.description,
            logo: logoImage?.imagePreviewUrl as string || "",
            website: ""
        }

        const resCreateOrg = await createOrganization(orgData)

        const { data } = resCreateOrg as AxiosResponse
        setLoading(false)

        if (data?.statusCode === apiStatusCodes.API_STATUS_CREATED) {

            props.setOpenModal(false)

        } else {
            setErrMsg(resCreateOrg as string)
        }
    }

    return (
        <Modal show={props.openModal} onClose={() => {
            setLogoImage({
                logoFile: "",
                imagePreviewUrl: "",
                fileName:''
            })
            props.setOpenModal(false)
        }
        }>
            <Modal.Header>Create Organization</Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                    }}
                    validationSchema={
                        yup.object().shape({
                            name: yup
                                .string()
                                .min(2, 'Organization name must be at least 2 characters')
                                .max(50, 'Organization name must be at most 50 characters')
                                .required('Organization name is required')
                                .trim(),
                            description: yup
                                .string()
                                .min(2, 'Organization name must be at least 2 characters')
                                .max(255, 'Organization name must be at most 255 characters')
                                .required('Description is required')
                        })}
                    validateOnBlur
                    validateOnChange
                    enableReinitialize
                    onSubmit={async (
                        values: Values,
                        { setSubmitting }: FormikHelpers<Values>
                    ) => {
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        //     setSubmitting(false);
                        // }, 500);

                        sumitCreateOrganization(values)

                    }}
                >
                    {(formikHandlers): JSX.Element => (

                        <Form className="space-y-6" onSubmit={
                            formikHandlers.handleSubmit
                            // () => alert('SUBMITTED')
                        }>
                            <div
                                className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800"
                            >
                                <div
                                    className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4"
                                >
                                    {
                                        typeof (logoImage.logoFile) === "string" ?
                                            <Avatar
                                                size="lg"
                                            /> :
                                            <img
                                                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                                                src={typeof (logoImage.logoFile) === "string" ? asset('images/users/bonnie-green-2x.png') : URL.createObjectURL(logoImage.logoFile)}
                                                alt="Jese picture"
                                            />
                                    }

                                    <div>
                                        <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                                            Organization Logo
                                        </h3>
                                        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                                          JPG, JPEG, SVG and PNG . Max size of 1MB
                                        </div>
                                        <div className="flex items-center space-x-4">

                                            <div>
                                                <label htmlFor="organizationlogo">
                                                    <div className="px-4 py-2 bg-blue-700 text-white text-center rounded-lg">Choose file</div>
                                                    <input type="file" accept="image/*" name="file"
                                                        className="hidden"
                                                        id="organizationlogo" title=""
                                                        onChange={(event): void => handleImageChange(event)} />
                                                    {/* <span>{selectedImage || 'No File Chosen'}</span> */}
                                                    {fileSizeError ? <div className="text-red-500">{fileSizeError}</div> : <span>{selectedImage || 'No File Chosen'}</span>}
                                                </label>


                                            </div>

                                            {/* <button
                                                type="button"
                                                className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            >
                                                Delete
                                            </button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    <Label
                                        htmlFor="name"
                                        value="Name"
                                    />
                                    <span className="text-red-500 text-xs">*</span>
                                </div>
                                <Field
                                    id="name"
                                    name="name"
                                    value={formikHandlers.values.name}                                    
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your organization name" />
                                {
                                    (formikHandlers?.errors?.name && formikHandlers?.touched?.name) &&
                                    <span className="text-red-500 text-xs">{formikHandlers?.errors?.name}</span>
                                }

                            </div>
                            <div>
                                <div
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    <Label
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <span className="text-red-500 text-xs">*</span>
                                </div>

                                <Field
                                    id="description"
                                    name="description"
                                    value={formikHandlers.values.description}
                                    as='textarea'                                    
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Description of your organization" />
                                {
                                    (formikHandlers?.errors?.description && formikHandlers?.touched?.description) &&
                                    <span className="text-red-500 text-xs">{formikHandlers?.errors?.description}</span>
                                }

                            </div>

                            <Button type="submit"
                                className='text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                            >
                                Create your organization
                            </Button>
                        </Form>
                    )}

                </Formik>
            </Modal.Body>
            {/* <Modal.Footer>
                    <Button onClick={() => props.setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => props.setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer> */}
        </Modal>
    )
}

export default CreateOrgFormModal;