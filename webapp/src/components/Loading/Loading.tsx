import { ILoadingProps } from "./utils/loading.types";

const Loading = (props: ILoadingProps) => {
	const loadingStyle = {
		width: `${props.size && props.size * 10}px`,
		height: `${props.size && props.size * 10}px`,
	};
	return (
		<div
			className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"
			style={loadingStyle}
		></div>
	);
};

export default Loading;