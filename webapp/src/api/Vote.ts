import { post } from "./Common";
import toast from "react-hot-toast";
import { IVote } from "../types/vote.types";

const VoteApi = () => {
	const url = "/votes";

	const postVote = async (obj: IVote) => {
		return await post(url, obj).then(() => toast.success("Movie voted successfully"));
	};

	return { postVote };
};

export default VoteApi;