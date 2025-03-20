const ModalRegisterOrderInputs = {
  sender_address: {},
  method: {
    rules: "required",
    default: null,
    options: [],
  },
  has_packing: {
    title: "بسته بندی",
    rules: "required",
    icon: "icon2-open-box",
    color: "#D07D00",
    default: null,
    options: [
      {
        value: false,
        label: "خودم بسته بندی را انجام میدهم",
      },
      {
        value: true,
        label: "سرویس دهنده بسته بندی را انجام دهد",
      },
    ],
  },
  has_pickup: {
    title: "جمع آوری",
    rules: "required",
    icon: "icon2-truck",
    color: "#E9605A",
    default: null,
    options: [
      {
        value: false,
        label: "خودم بسته را تحویل سرویس دهنده می دهم",
      },
      {
        value: true,
        label: "سرویس دهنده جمع آوری کند",
      },
    ],
  },
  has_pass_keraye: {
    title: "پس کرایه",
    rules: "required",
    icon: "icon2-pass-keraye",
    color: "#B9A44C",
    default: false,
    options: [
      {
        value: true,
        label: "هزینه ارسال با مشتری",
      },
    ],
  },
  has_cod: {
    title: "پرداخت در محل",
    rules: "required",
    icon: "icon2-cod",
    color: "#0892A5",
    default: false,
    options: [
      {
        value: true,
        label: "پرداخت هزینه کالا در زمان تحویل",
      },
    ],
  },
};

export default ModalRegisterOrderInputs;