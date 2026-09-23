/* ============================================================
   CampusMarket — shared product data
   This is our stand-in "database" for Weeks 1-5 (static files
   only, no PHP/MySQL yet — that's Week 7+). Every page that
   needs product info reads from this same array, so the
   catalog stays consistent across Home, Marketplace and the
   Product Detail page.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: 'HP Pavilion 14" Core i5 Laptop',
    category: "electronics",
    price: 45000,
    oldPrice: 68000,
    condition: "Used - Like New",
    campus: "UoN Main Campus",
    seller: "Brian Kiprono",
    sellerCourse: "3rd Year Computer Science • MMU",
    rating: 4.9,
    reviews: 28,
    stock: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCrDb0xTi2VEWSGthaosAq06oWMQid6WyBNoOqIxH0YrznqfrwraerVeA0QQtcIyDeFN5q99bO7BNkrlkOx_850x757DKo98pmP5rhFb01qvwg1MqYpoOuA1BTPPX4vEbesb0EEN3KGBxvm_X1hfPPCHL41CesfYfX6kZkw--lP_pj7JE5PTGjmfMFsgrlpO5RxCpjj5SfgKM0aTeudW45Xm4_lvxJU7jSA96DQSfr6zNhfyUaJHTv",
    description: "Lightly used for two semesters of computer science coursework. Screen is flawless, keyboard and trackpad in 100% working order. Includes original HP charger and a shockproof sleeve.",
    specs: { Processor: "Intel Core i5-1135G7", RAM: "8GB DDR4", Storage: "256GB NVMe SSD", Display: "14.0\" FHD 1920x1080" }
  },
  {
    id: 2,
    name: "Sony WH-CH720N Noise-Cancelling Headphones",
    category: "electronics",
    price: 8500,
    oldPrice: 12000,
    condition: "Brand New",
    campus: "Strathmore University",
    seller: "Faith Mwangi",
    sellerCourse: "2nd Year Business IT • Strathmore",
    rating: 4.8,
    reviews: 15,
    stock: 3,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD95LHETG4x3mnIZk_O9BDISNCw_58op-L1OK12C_vQVefUaaHSt8BeKH2gNwdQn47LV-X-Lzjjrjb8dbJIIXDTqe003NoknbN2KMp1OsyJBLmrLLdE57DUB0j6hv4SBJWPKuTwl0q0gSddEpkCH6_fNm6fow70WexyiiUsq0o0TXFdEF4hjhOXo9d2nPbtzm_VJTJVL1MaPJd_odncqPUMknsRTK-VP5lO5ZKhdHvgnNQLYmL9ssh2",
    description: "Sealed box, bought as a gift but never opened. Great active noise cancelling for library study sessions or the bus to campus.",
    specs: { Type: "Over-ear, wireless", Battery: "Up to 35 hours", ANC: "Yes", Connectivity: "Bluetooth 5.2" }
  },
  {
    id: 3,
    name: "Nike Air Force 1 Classic (Size 42)",
    category: "fashion",
    price: 3200,
    oldPrice: null,
    condition: "Used - Good",
    campus: "KU Main Campus",
    seller: "Kevin Otieno",
    sellerCourse: "1st Year Economics • KU",
    rating: 4.6,
    reviews: 9,
    stock: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCniqFIf-ZarRXKWYR49TrxVP1PI8oZcTaSCVEjrwX65kLix94BvrAf-MLGREFXn4ikjlsCPzUP9xjsmn_ADwL2MyFAyNPZRSdQOzyA6hHHWV4CVvuKSvO3rmAelV9Ztsy4YI1_24Os5J47Gp7HZ_WAfA52MgudK2rumM3Yn_ZldsxWtj9jokfbUie9KRgzux2cMzAMYFMGr1ONX8hyjWXNIKJm7iaNGoZyn8U50zhmT63vCee4w6Af",
    description: "Classic white Air Force 1s, worn for about a semester. Some creasing on the toe box but no stains, sole still in good shape.",
    specs: { Size: "EU 42 / UK 7.5", Color: "White", Material: "Leather upper" }
  },
  {
    id: 4,
    name: "JBL Flip 5 Portable Speaker",
    category: "electronics",
    price: 5800,
    oldPrice: null,
    condition: "Used - Good",
    campus: "JKUAT Juja",
    seller: "Mercy Wanjiru",
    sellerCourse: "3rd Year IT • JKUAT",
    rating: 4.7,
    reviews: 11,
    stock: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl2wpJVCkreiyEPxhyaVIQxa3bMXo-N4xaVLMa9NbdZJYRNLviN55eBgR1eB5XX3UjX5UcfR5HPZX5IvPE2fkW2rjxTwxV3D_ubJLUxSbOgDYqQUJwlZPg7bZbzPYZZB03ScMZJmOSm5gT59LR71X0ah4-pi6uayo7OwEMpcn7ekZeZffPIXICw5zwoBVJjQv5BcdCKEdKT86NM8_Em9GteldCF0-bAMm6A0DbxfVDA3YuhbpiPRCB",
    description: "Waterproof Bluetooth speaker, great bass for hostel room sessions. Battery still holds a full day of charge.",
    specs: { Battery: "Up to 12 hours", Waterproof: "IPX7", Connectivity: "Bluetooth 4.2" }
  },
  {
    id: 5,
    name: "Engineering Mathematics, 8th Edition (Stroud)",
    category: "books",
    price: 1800,
    oldPrice: 3200,
    condition: "Used - Clean",
    campus: "UoN Chiromo Campus",
    seller: "Peter Kamau",
    sellerCourse: "4th Year Mechanical Eng. • UoN",
    rating: 5.0,
    reviews: 6,
    stock: 2,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCX8ZXthgYPKId1nEcLYmUKtgGmTOdPY-j-UyCSF5FPnRmgISaRqtuStU3FF2F4yJtpmLDvHk2N3Wtq6lIh7XkSMvdamfF-LO185Mo8iL369ojet-9wFsJuPxtvmcetlpgAYA_brMdp6OcSvkC3ZKbb2yTHy7IEj1r-aqU3Xv4vzk6lttahUaEaPOdJzOQk_rmlRrzHA1vtMuYhH6kLg9n8F-mbs8ncwcnOadN7ZIn-HEJMo5qdXr8a",
    description: "Course text for engineering mathematics units. No torn pages, minimal highlighting only in chapter 3.",
    specs: { Edition: "8th", Cover: "Paperback", Condition: "Minimal highlighting" }
  },
  {
    id: 6,
    name: "Heavyweight Oversized Hoodie",
    category: "fashion",
    price: 2200,
    oldPrice: null,
    condition: "Brand New",
    campus: "Daystar Valley Road",
    seller: "Ann Njeri",
    sellerCourse: "2nd Year Communications • Daystar",
    rating: 4.9,
    reviews: 4,
    stock: 5,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsX3hW2Hyaw4m4Ng8iUz_cU21Gtp6Z7lmGxkLcRn2VSIpADhBGr2BG1A_LwbD4QurowsPXIdABZsf8bjzMwSrWcbY6BaflwikWd-Q6fI0MVGVK_oJPl9cLQ5A4CbIyjsExZLzvUmbh6KZL85rTz9dH17pdJt5ax9vVHnX56SjKuQzjaJWT33iR3bEx0sLCSDBuzyi_Ox8JZMy7UwS3n-WLEwy3zWzsyKKg-_78448iXuYhWu4zYquO",
    description: "Fleece-lined oversized hoodie, ordered in the wrong size. Still has the original tag on.",
    specs: { Size: "L (oversized fit)", Material: "Cotton fleece blend", Color: "Lavender" }
  },
  {
    id: 7,
    name: "Dell Latitude 7490 Core i7 16GB",
    category: "electronics",
    price: 38000,
    oldPrice: null,
    condition: "Refurbished",
    campus: "USIU-A",
    seller: "Samuel Kiptoo",
    sellerCourse: "Graduate Assistant • USIU-A",
    rating: 4.5,
    reviews: 7,
    stock: 1,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjujUNLBZJ3me6u2IIO8EJEzqx8r7Dz0b_3dU8_NnmeF74UIavC_7Xpy0I5kEnjIx-4Nskf1W4XefvhE2erskRhuDv-SOcnq_sof4UDy2tJrd0Y_przulez6dK4aiBot-6wiqKT_xsIPHeamJYVUQgLrCrOWO8pgFzMbcxjw90Zs21ge78frnlW9Nv7XDnTzIYmkTmYvnBtIt7w01UtIOrziZmSY89o9tULG7zZ2Ygn5Qa0S8-p8oj",
    description: "Business ultrabook, professionally refurbished with a fresh battery. Great for heavier coding and multitasking.",
    specs: { Processor: "Intel Core i7-8650U", RAM: "16GB DDR4", Storage: "512GB SSD" }
  },
  {
    id: 8,
    name: "Casio fx-991EX ClassWiz Scientific Calculator",
    category: "stationery",
    price: 2400,
    oldPrice: null,
    condition: "Used - Excellent",
    campus: "JKUAT",
    seller: "Winnie Achieng",
    sellerCourse: "2nd Year Electrical Eng. • JKUAT",
    rating: 5.0,
    reviews: 12,
    stock: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIU8e-gHPzeA8nJM-lQi4of_mwgrUvcBPuhq3FrnoSmFMycUJILCCpgEPV1KePpiplcGMF6HADarcLucz201QG6YiEZ-R4BacDr1ToOjDad6VZPGw2-sXXGfnwKeHOO_qjKDKO3E6cuheO-_YqiFt7oHjYbQ0I4S_ammKycsL5FoeFk1ioO5uT4Ltkdh-8q7OprPdAfotGJjiQaqS1Qtx3mebIG7mIi6WDxCtjo2ZVfTGVi6izFUkS",
    description: "Standard engineering calculator, works perfectly. Selling because I now use the fx-991EX CW model.",
    specs: { Functions: "552 functions", Display: "Natural textbook display" }
  },
  {
    id: 9,
    name: "Anker 20,000mAh Fast Power Bank",
    category: "electronics",
    price: 3500,
    oldPrice: null,
    condition: "Brand New",
    campus: "UoN Chiromo Campus",
    seller: "David Mutua",
    sellerCourse: "1st Year Computer Science • UoN",
    rating: 4.8,
    reviews: 3,
    stock: 6,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMSo78TBAzMqBhgEt7wnp2vHck035KfvSksmLpQcs07QDuwXPGuU4Vb8ymBHBdBVJK1byt1qQ29JB12T0HZcQe6pAfj99imCvI1xiZXpsFjnzPTfAaSITF0VwFzuLgb8-gNUdIBbH2wNYiJDQlmVcVVxWdPahjSBwgb_br4fwLnR-b6iswhd8P50kW_pqgFBc5YYsvG1l4rcqBRV4sNXwiszhcAdbPznrD6J1HC1X3G_08Xf4lW93r",
    description: "Fast-charging power bank with USB-C input/output. Bought two by mistake, this one is still sealed.",
    specs: { Capacity: "20,000mAh", Output: "18W fast charge", Ports: "USB-C, USB-A x2" }
  }
];

// ---- small shared helpers used across pages ----

function formatKSh(amount) {
  return "KSh " + Number(amount).toLocaleString();
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

function getRelatedProducts(product, count = 2) {
  return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, count);
}
