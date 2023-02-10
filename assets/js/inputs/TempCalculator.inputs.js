const TempCalculatorInputs = {
  from_city: {
    label: "شهر مبدا",
    placeholder: "شهر مبدا را انتخاب کنید",
    options: [
      {
        id: 0,
        title: "در حال بارگذاری...",
        disabled: true,
      },
    ],
  },
  to_city: {
    label: "شهر مقصد",
    placeholder: "شهر مقصد را انتخاب کنید",
    options: [
      {
        id: 0,
        title: "در حال بارگذاری...",
        disabled: true,
      },
    ],
  },
  weight: {
    label: "وزن مرسوله",
    placeholder: "وزن مرسوله را انتخاب کنید",
  },
  value: {
    label: "ارزش مرسوله",
    placeholder: "ارزش مرسوله را وارد کنید",
  },
  package_type: {
    label: "سایز مرسوله",
    placeholder: "سایز مرسوله را انتخاب کنید",
    options: [
      {
        id: 0,
        title: "در حال بارگذاری...",
        disabled: true,
      },
    ],
  },
};

export default TempCalculatorInputs;
