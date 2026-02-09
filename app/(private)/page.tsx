// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/store/index";
// import { routes } from "@/lib/constants/routes";

// export default function PrivateRootPage() {
//   const router = useRouter();
//   const token = useAppSelector((s) => s.auth.token);

//   useEffect(() => {
//     if (!token) {
//       router.replace(routes.register);
//       return;
//     }
//     router.replace(routes.recommended);
//   }, [token, router]);

//   return null;
// }
