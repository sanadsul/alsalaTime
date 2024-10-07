import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../src/index.css"


const Home = () => {
    const [timings, setTimings] = useState({});
    const [date, setDate] = useState({hijri:"loading..."});
    const [meta, setMeta] = useState({timezone:"loading ..."});
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,  // لتفعيل التحريك التلقائي
        autoplaySpeed: 3000,  // تغيير الصورة كل 3 ثوانٍ
        arrows: false  // لإخفاء الأسهم
    };
    const images = [
        "image1.jpg", // استبدل بأسماء الصور أو روابطها
        "image2.jpg",
        "image3.jpg",
      ];

    // دالة لتحميل عنوان API
    // const fetchApiUrl = async () => {
    //     const response = await fetch('/api-url'); // تأكد من أن هذه النقطة تعمل
    //     const data = await response.json();
    //     setApiUrl(data.apiUrl);
    //     console.log("API URL set to:", data.apiUrl); // تأكد من أن apiUrl صحيح
    // };

    // دالة لجلب أوقات الصلاة بناءً على المدينة والدولة
    const apiUrl = import.meta.env.VITE_API_URL;
const apiUrlLocation = import.meta.env.VITE_API_URL_LOCATION;

const fetchPrayerTimesByCityCountry = async () => {
    const response = await fetch(`${apiUrl}?city=${city}&country=${country}`);

    if (!response.ok) {
        console.error('HTTP error:', response.status, await response.text());
        return;
    }

    const data = await response.json();
    if (data.code === 200) {
        displayPrayerTimes(data.data);
    } else {
        console.error('Error fetching prayer times:', data.status);
    }
};

// دالة لجلب أوقات الصلاة بناءً على الإحداثيات
const fetchPrayerTimesByCoordinates = async (lat, lon) => {
    if (!apiUrl) return; // تأكد من تحميل apiUrl أولاً
    const response = await fetch(`${apiUrlLocation}?latitude=${lat}&longitude=${lon}`);
    const data = await response.json();
    if (data.code === 200) {
        displayPrayerTimes(data.data);
    } else {
        console.error('Error fetching prayer times:', data.status);
    }
};

// دالة لعرض أوقات الصلاة في DOM
const displayPrayerTimes = (data) => {
    setTimings(data.timings);
    setDate(data.date);
    setMeta(data.meta);
};

// استخدام الموقع الحالي لجلب أوقات الصلاة تلقائيًا عند تحميل الصفحة
const fetchLocationAndPrayerTimes = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                fetchPrayerTimesByCoordinates(latitude, longitude);
            },
            error => {
                console.error('Error getting location:', error.message);
            }
        );
    } else {
        alert('الرجاء تفعيل خدمة الموقع على جهازك.');
    }
};

// عند تحميل الصفحة أو المكون سيتم تنفيذ هذه الدالة لجلب الموقع تلقائيًا
useEffect(() => {
    fetchLocationAndPrayerTimes();
}, []);  // [] لضمان تنفيذ الدالة مرة واحدة عند تحميل المكون

// [] تعني أن هذا التأثير سيعمل مرة واحدة عند التحميل

    return (
      <div className="bg-gray-100 text-gray-900 min-h-screen overflow-hidden" dir="rtl">
        {/* <nav className="flex justify-between items-center bg-gray-200">
          <div className="bg-gray-200 p-4"></div>
        </nav> */}
        {/* Header Section */}
        <header
          className="bg-[url('/image1.jpg')] bg-cover bg-center bg-no-repeat text-white p-32 pt-1 shadow-lg rounded-b-2xl"
          style={{ backgroundSize: "100%" }}  // غيّرنا من 100% إلى cover
        >
          <div className="container mx-auto text-center justify-center items-center m-4">
            {/* <h1 className="text-4xl font-bold  text-teal-600 mb-2">مواقيت الصلاة</h1> */}
            <p className=" text-lg text-white-400 font-bold bg-green-600 inline shadow-md rounded-xl p-1 ">
              أوقات الصلاة اليومية بناءً على موقعك الجغرافي
            </p>

            <div className="mt-5"></div>
          </div>
        </header>

        {/* Selection Section */}
        {/* <section className="container mx-auto py-6 px-4 dir=rtl">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-teal-500 to-blue-600 text-white py-2 px-4 m-2 rounded-lg shadow-lg inline">
                اختر الدولة والمدينة أو استخدم موقعك الحالي
              </h2>
            </div>

            {/* Country and City Selection Form */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 dir=rtl">
              <div>
                <label
                  htmlFor="country"
                  className="block text-lg font-semibold mb-2"
                >
                  <span className="bg-gradient-to-r from-teal-500 to-blue-600 text-white inline px-1 rounded-md">
                    الدولة:
                  </span>
                </label>
                <input
                  id="country"
                  type="text"
                  className="bg-gray-100 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="أدخل الدولة"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-lg font-semibold mb-2"
                >
                  <span className="bg-gradient-to-r from-teal-500 to-blue-600 text-white inline px-1 rounded-md">
                    المدينة:
                  </span>
                </label>
                <input
                  id="city"
                  type="text"
                  className="bg-gray-100 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="أدخل المدينة"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div> */} 

            {/* Use Current Location Button */}
            {/* <div className="text-center">
              <button
                id="useLocation"
                className="bg-teal-500 text-white py-2 px-4 m-2 rounded-lg shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                onClick={handleUseLocation}
              >
                استخدام الموقع الحالي
              </button>
              <button
                id="fetchTimes"
                className="bg-blue-500 text-white py-2 px-4 m-2 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ml-4"
                onClick={handleFetchTimes}
              >
                عرض مواقيت الصلاة
              </button>
            </div>
          </div>
        </section> */}

        {/* Prayer Times Section */}
        <section className="container mx-auto py-12 px-4 -mb-12">
            <div className="p-8 text-center ">
              <h2 className=" bg-gradient-to-r from-green-500 to-green-600 text-white inline px-4 py-1 rounded-md text-2xl font-bold ">
                مواقيت الصلاة اليوم
              </h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden p-3 mb-0">

              {/* Placeholder for the prayer times */}
              <div
                id="prayer-times"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 text-white p-4"
              >
                {/* Fajr */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black p-12 rounded-lg shadow-md flex items-center justify-center flex-col">
                  <i className="fas fa-moon text-4xl mb-4"></i>
                  <img class="icon" src="//timesprayer.com/images/fajr.svg" width="45" height="45" alt="" srcset=""></img>
                  <h3 className="text-xl font-bold  ">الفجر</h3>
                  <p id="fajr" className="text-4xl text-white mt-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1 inline ">
                    {timings.Fajr || "--:--"}
                  </p>
                </div>
                {/* Dhuhr */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
                  {/* <i className="fas fa-sun text-4xl mb-4"></i> */}
                  <img class="icon" src="//timesprayer.com/images/dhuhr.svg" width="45" height="45" alt="" srcset=""></img>
                  <h3 className="text-xl font-bold">الظهر</h3>
                  <p id="dhuhr" className="text-white shadow-lg text-4xl mt-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1 inline">
                    {timings.Dhuhr || "--:--"}
                  </p>
                </div>
                {/* Asr */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black p-6 rounded-lg shadow-md flex items-center justify-center flex-col">
                  {/* <i className="fas fa-cloud-sun text-4xl mb-4"></i> */}
                  <img class="icon" src="//timesprayer.com/images/asr.svg" width="45" height="45" alt="" srcset=""></img>
                  <h3 className="text-xl font-bold">العصر</h3>
                  <p id="asr" className="text-white shadow-lg text-4xl mt-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1 inline">
                    {timings.Asr || "--:--"}
                  </p>
                </div>
                {/* Maghrib */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black  p-12 rounded-lg shadow-md flex items-center justify-center flex-col">
                <img class="icon" src="//timesprayer.com/images/maghrib.svg" width="45" height="45" alt="" srcset=""/>
                  <h3 className="text-xl font-bold">المغرب</h3>
                  <p id="maghrib" className="text-white shadow-lg text-4xl mt-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1 inline">
                    {timings.Maghrib || "--:--"}
                  </p>
                </div>
                {/* Isha */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-200 text-black  p-16 rounded-lg shadow-md flex items-center justify-center flex-col">
                <img class="icon" src="//timesprayer.com/images/isha.svg" width="45" height="45" alt="" srcset=""/>                  <h3 className="text-xl font-bold">العشاء</h3>
                  <p id="isha" className="text-white shadow-lg text-4xl mt-2 bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-1 inline">
                    {timings.Isha || "--:--"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className='container mx-auto py-4 px-4 rounded-lg shadow-lg bg-white'>

          <div >
            <h3 className='p-1 bg-gradient-to-bl from-green-500 to-green-700 inline rounded-lg text-white'>ملاحظه </h3>
<br />
            <p className='mt-3 bg-gray-200 rounded-xl inline-flex text-black shadow-md p-1 m-2 '>
            "التوقيت المعروض يعكس أوقات الصلاة حسب مدينتك والدولة التي تقيم فيها بناءً على الموقع الجغرافي الحالي." 
            </p>
        <div/>
        </div>
        </section>
              {/* Date and location information */}
              {/* <div className="mt-8">
                <h3 className="text-lg font-bold m-2">
                  التاريخ الميلادي:{" "}
                  <span
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                    id="gregorian-date"
                  >
                    {date.gregorian?.date || "loading..."}
                  </span>
                </h3>
                <h3 className="text-lg font-bold m-2">
                  التاريخ الهجري:{" "}
                  <span
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                    id="hijri-date"
                  >{`${date.hijri?.date || ""} (${
                    date.hijri?.weekday?.ar || "loading..."
                  })`}</span>
                </h3>
                <h3 className="text-lg font-bold m-2">
                  الموقع:{" "}
                  <span
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                    id="location"
                  >
                    {`(${meta.timezone})` || ""}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </section> */}

          <section className="container mx-auto py-6 px-4 ">
            <div className='bg-white shadow-xl rounded-lg p-3'>

              <h3 className="bg-gradient-to-r from-green-500 to-green-600 text-white inline p-1 rounded-md text-2xl font-bold">حديث اليـوم</h3>
              <p className="reference mt-2">
                <b>المصدر:</b> صحيح البخاري,1-كتاب بدء الوحى , رقم الحديث 5
              </p>
              <blockquote>
                <span className="arabic_sanad arabic"></span>
                <span className="arabic_text_details arabic">
                  حَدَّثَنَا مُوسَى بْنُ إِسْمَاعِيلَ، قَالَ حَدَّثَنَا أَبُو
                  عَوَانَةَ، قَالَ حَدَّثَنَا مُوسَى بْنُ أَبِي عَائِشَةَ، قَالَ
                  حَدَّثَنَا سَعِيدُ بْنُ جُبَيْرٍ، عَنِ ابْنِ عَبَّاسٍ، فِي
                  قَوْلِهِ تَعَالَى &rlm;
                  <b>
                    <c_q5>
                      &rlm;لاَ تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ&rlm;
                    </c_q5>
                  </b>
                  &rlm; قَالَ كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم يُعَالِجُ
                  مِنَ التَّنْزِيلِ شِدَّةً، وَكَانَ مِمَّا يُحَرِّكُ شَفَتَيْهِ
                  ـ فَقَالَ ابْنُ عَبَّاسٍ فَأَنَا أُحَرِّكُهُمَا لَكُمْ كَمَا
                  كَانَ رَسُولُ اللَّهِ صلى الله عليه وسلم
                  يُحَرِّكُهُمَا&rlm;.&rlm; وَقَالَ سَعِيدٌ أَنَا أُحَرِّكُهُمَا
                  كَمَا رَأَيْتُ ابْنَ عَبَّاسٍ يُحَرِّكُهُمَا&rlm;.&rlm;
                  فَحَرَّكَ شَفَتَيْهِ ـ فَأَنْزَلَ اللَّهُ تَعَالَى{" "}
                  <b>
                    <c_q6>
                      &rlm;&rlm;لاَ تُحَرِّكْ بِهِ لِسَانَكَ لِتَعْجَلَ بِهِ*
                      إِنَّ عَلَيْنَا جَمْعَهُ وَقُرْآنَهُ&rlm;&rlm;
                    </c_q6>
                  </b>{" "}
                  قَالَ جَمْعُهُ لَهُ فِي صَدْرِكَ، وَتَقْرَأَهُ &rlm;
                  <b>
                    <c_q7>
                      &rlm;فَإِذَا قَرَأْنَاهُ فَاتَّبِعْ قُرْآنَهُ&rlm;
                    </c_q7>
                  </b>
                  &rlm; قَالَ فَاسْتَمِعْ لَهُ وَأَنْصِتْ &rlm;
                  <b>
                    <c_q8>&rlm;ثُمَّ إِنَّ عَلَيْنَا بَيَانَهُ&rlm;</c_q8>
                  </b>
                  &rlm; ثُمَّ إِنَّ عَلَيْنَا أَنْ تَقْرَأَهُ&rlm;.&rlm; فَكَانَ
                  رَسُولُ اللَّهِ صلى الله عليه وسلم بَعْدَ ذَلِكَ إِذَا أَتَاهُ
                  جِبْرِيلُ اسْتَمَعَ، فَإِذَا انْطَلَقَ جِبْرِيلُ قَرَأَهُ
                  النَّبِيُّ صلى الله عليه وسلم كَمَا قَرَأَهُ&rlm;.&rlm;
                </span>
                <span class="arabic_sanad arabic"></span>{" "}
                <span class="by">رسول الله محمد (ﷺ)</span>
              </blockquote>
              </div>
              <div className='bg-white shadow-xl rounded-lg p-7 mt-7'>

              <h3 className="bg-gradient-to-r from-green-500 to-green-600 text-white inline p-1 rounded-md text-2xl font-bold"> دعاء اليـوم</h3>
              <p className="reference mb-1 mt-2 ">
              <span className=' text-green-800 text-sm font-bold'>الدعاء والأذكار</span>
              </p>
              <blockquote>
                <span className="arabic_sanad arabic"></span>
                <span>
                رَّبِّ ٱغۡفِرۡ وَٱرۡحَمۡ وَأَنتَ خَيۡرُ ٱلرَّٰحِمِينَ&rlm;
                </span>
              </blockquote>
              </div>
              </section>
              
        {/* Footer Section */}
        <div className="mb-4">
        <footer className="bg-gradient-to-r from-teal-500 to-blue-700 text-white m-0 font-bold">
          <div className="container text-center">
            <p> جميع الحقوق محفوظة © 2024 - سند المنفي</p>
          </div>
        </footer>
       <div/>
      </div>
    );
};

export default Home;
