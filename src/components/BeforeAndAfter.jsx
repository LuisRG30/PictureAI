import ReactCompareImage from 'react-compare-image';

const BeforeAndAfter = () => {
    return (
        <div className='flex justify-center rounded'>
            <div className="w-9/12" style={{ borderRadius: '1rem' }}>
                <ReactCompareImage
                    leftImage="/assets/images/before.jpeg"
                    rightImage="/assets/images/after.jpeg"
                    hover={true}
                    sliderLineWidth={3}
                />
            </div>
        </div>
    );
}

export default BeforeAndAfter;