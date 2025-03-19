import Image from "next/image";

const BannerSection = () => {
    return (
        <div className="grid gap-4">
            {/* Hàng trên - 2 banner lớn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Banner 1 */}
                <div className="relative w-full h-60 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
                    <Image src="/image/banner1.jpg" alt="Iphone" layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-110"/>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 text-white w-[80%] sm:w-[60%]">
                        <p className="text-sm sm:text-lg font-semibold text-red-400">Mua chỉ với 6,000,000 đ</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-black">Iphone 16 Pro Max 256GB VN/A</h2>
                        <p className="text-xs sm:text-sm text-[#717171]">Iphone 16 Pro Max 256GB VN/A đang là sản phẩm khá được ưa chuộng hiện nay</p>
                        <button className="mt-2 sm:mt-4 bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg">Mua ngay →</button>
                    </div>
                </div>

                {/* Banner 2 */}
                <div className="relative w-full h-60 sm:h-72 md:h-96 rounded-lg overflow-hidden shadow-md">
                    <Image src="/image/banner2.jpg" alt="Iphone" layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-110"/>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 text-white w-[80%] sm:w-[50%]">
                        <p className="text-sm sm:text-lg font-semibold text-red-400">Mua chỉ với 6,000,000 đ</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-black">Iphone 16 Pro Max 256GB VN/A</h2>
                        <p className="text-xs sm:text-sm text-[#717171]">Iphone 16 Pro Max 256GB VN/A đang là sản phẩm khá được ưa chuộng hiện nay</p>
                        <button className="mt-2 sm:mt-4 bg-black text-white px-3 sm:px-4 py-2 rounded-lg">Mua ngay →</button>
                    </div>
                </div>
            </div>

            {/* Hàng dưới - 3 banner nhỏ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
                {/* Banner 3 */}
                <div className="relative col-span-full sm:col-span-1 lg:col-span-3 h-60 sm:h-72 lg:h-[400px] rounded-lg overflow-hidden shadow-md">
                    <Image src="/image/banner3.jpg" alt="AirPods" layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-110"/>
                    <div className="absolute top-[50%] inset-0 flex flex-col justify-center text-center px-4 sm:px-6 text-white w-full">
                        <p className="text-sm sm:text-lg font-semibold text-red-400">Hàng mới về</p>
                        <h2 className="text-lg sm:text-xl font-bold text-black">Apple AirPods Max Space Orange</h2>
                        <button className="mt-2 sm:mt-4 bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg">Mua ngay →</button>
                    </div>
                </div>

                {/* Banner 4 */}
                <div className="relative col-span-full sm:col-span-1 lg:col-span-6 h-60 sm:h-72 lg:h-[400px] rounded-lg overflow-hidden shadow-md">
                    <Image src="/image/banner5.jpg" alt="Iphone" layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-110"/>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 text-white w-[80%] sm:w-[60%]">
                        <p className="text-sm sm:text-lg font-semibold text-red-400">Mua chỉ với 6,000,000 đ</p>
                        <h2 className="text-lg sm:text-xl font-bold text-black">Iphone 16 Pro Max 256GB VN/A</h2>
                        <p className="text-xs sm:text-sm text-[#717171]">Iphone 16 Pro Max 256GB VN/A đang là sản phẩm khá được ưa chuộng hiện nay</p>
                        <button className="mt-2 sm:mt-4 bg-black text-white px-3 sm:px-4 py-2 rounded-lg">Mua ngay →</button>
                    </div>
                </div>

                {/* Banner 5 */}
                <div className="relative col-span-full sm:col-span-1 lg:col-span-3 h-60 sm:h-72 lg:h-[400px] rounded-lg overflow-hidden shadow-md">
                    <Image src="/image/banner4.jpg" alt="AirPods" layout="fill" objectFit="cover" className="transition-transform duration-500 hover:scale-110"/>
                    <div className="absolute top-[50%] inset-0 flex flex-col justify-center text-center px-4 sm:px-6 text-white w-full">
                        <p className="text-sm sm:text-lg font-semibold text-red-400">Hàng mới về</p>
                        <h2 className="text-lg sm:text-xl font-bold text-black">Apple AirPods Max Space Orange</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;
