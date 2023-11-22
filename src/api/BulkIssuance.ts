import type download from 'downloadjs';
import { apiRoutes } from '../config/apiRoutes';
import { storageKeys } from '../config/CommonConstant';
import {
	getHeaderConfigs,
	getHeaderConfigsForFormData,
} from '../config/GetHeaderConfigs';
import { axiosGet, axiosPost } from '../services/apiRequests';
import { getFromLocalStorage } from './Auth';

export const getSchemaCredDef = async () => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}${apiRoutes.Issuance.bulk.credefList}`;
	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const DownloadCsvTemplate = async () => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const credDefId = await getFromLocalStorage(storageKeys.CRED_DEF_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}/${credDefId}${apiRoutes.Issuance.download}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

// bulk issuance

// upload file

export const uploadCsvFile = async (payload: any) => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const credefId = await getFromLocalStorage(storageKeys.CRED_DEF_ID);

	const url = `${apiRoutes.organizations.root}/${orgId}${apiRoutes.Issuance.bulk.uploadCsv}?credDefId=${credefId}`;

	const axiosPayload = {
		url,
		payload: payload,
		config: await getHeaderConfigsForFormData(),
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

//get file data

export const getCsvFileData = async (
	requestId: any,
	pageNumber: number,
	pageSize: number,
	search: string,
) => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}/${requestId}${apiRoutes.Issuance.bulk.preview}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const issueBulkCredential = async (requestId: string, clientId: string) => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}/${requestId}${apiRoutes.Issuance.bulk.bulk}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
		payload: {
			clientId
		}
	};

	try {
		return await axiosPost(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const retryBulkIssuance = async (fileId:string) => {
	 const socketId=  await getFromLocalStorage(storageKeys.SOCKET_ID)
	 
		const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
		const url = `${apiRoutes.organizations.root}/${orgId}/${fileId}${apiRoutes.Issuance.bulk.retry}`;
	
		const axiosPayload = {
			url,
			payload:{clientId:socketId},
			config: await getHeaderConfigs(),
		};		
	
		try {
			return await axiosPost(axiosPayload);
		} catch (error) {
			const err = error as Error;
			return err?.message;
		}
};

export const getFilesHistory = async (
	pageNumber: number,
	pageSize: number,
	search: string,
) => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}${apiRoutes.Issuance.bulk.files}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};

export const getFilesDataHistory = async (
	requestId: string,
	pageNumber: number,
	pageSize: number,
	search: string,
	sortBy:string
) => {
	const orgId = await getFromLocalStorage(storageKeys.ORG_ID);
	const url = `${apiRoutes.organizations.root}/${orgId}/${requestId}${apiRoutes.Issuance.bulk.filesData}?pageNumber=${pageNumber}&pageSize=${pageSize}&search=${search}&sortBy=${sortBy}`;

	const axiosPayload = {
		url,
		config: await getHeaderConfigs(),
	};

	try {
		return await axiosGet(axiosPayload);
	} catch (error) {
		const err = error as Error;
		return err?.message;
	}
};
