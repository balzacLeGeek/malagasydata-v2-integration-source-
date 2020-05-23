import Http from '@services/http'
import { WS } from '@ws'

export const Authentication = async (data, loader) => {
	return await Http.post({
		url: WS.security.authentication,
		data,
		loader,
		apiPrefix: false,
	});
};
