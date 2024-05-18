function LoadMoreBtn({ onClick }) {
    const handleClick = (e) => {
        e.preventDefault();
        onClick();
    };

    return (
        <button onClick={(e) => handleClick(e)} type="button">Load More!</button>
    )
}

export default LoadMoreBtn;
