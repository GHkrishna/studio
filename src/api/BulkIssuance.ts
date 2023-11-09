import type download from 'downloadjs';
import { apiRoutes } from '../config/apiRoutes';
import { storageKeys } from '../config/CommonConstant';
import { getHeaderConfigs } from '../config/GetHeaderConfigs';
import { axiosGet } from '../services/apiRequests';
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
	const credDefId = await getFromLocalStorage(storageKeys.CRED_DEF_ID)
	const url = `${apiRoutes.organizations.root}/${orgId}/${credDefId}${apiRoutes.Issuance.download}`;	
	console.log("url",url);
	
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

