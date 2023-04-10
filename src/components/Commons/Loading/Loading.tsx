interface ILoading {
    className?: string;
}

const Loading = ({ className = "" }: ILoading) => {
    return (
        <div className='flex justify-center items-center'>
            <div
                className={`spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 ${className}`}
                role='status'
            ></div>
        </div>
    );
};
export default Loading;
