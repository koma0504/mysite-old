// pages/index.js
import Link from "next/link";
import Image from "next/image";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { useCallback } from "react"; //再生成を防ぐ
import { useEffect } from "react";
import { useState } from "react";
import { motion } from "framer-motion";

const useCount = () => {
	const [count, setCount] = useState(1);
	const hendleClick = useCallback(() => {
		if (count < 10) {
			setCount((count) => count + 1);
		}
	}, []);
	const [isShow, setIsShow] = useState(true);
	const handleDisplay = useCallback(() => {
		setIsShow((isShow) => !isShow);
	}, []);

	return { count, hendleClick, isShow, handleDisplay };
};

export default function Home({ blog }) {
	const { count, hendleClick, isShow, handleDisplay } = useCount();
	useEffect(() => {
		console.log("マウント時");
		return () => {
			console.log("アンマウント時");
		};
	}, [count]);

	const [text, setText] = useState("");
	const hendleText = useCallback((e) => {
		if (e.target.value.length >= 5) {
			alert("五文字以内にして下さ");
			return;
		}
		setText(e.target.value);
	}, []);

	const [array, setArray] = useState([]);
	const handleAdd = useCallback(() => {
		setArray((prevArray) => {
			const newArray = [...prevArray, 1];
			return newArray;
		});
	}, []);
	const list = {
		visible: {
			opacity: 1,
			transition: { when: "beforeChildren", staggerChildren: 0.3 },
		},
		hidden: { opacity: 0 },
	};
	const item = {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -100 },
	};

	return (
		<div className="body">
			<Header title="RATIO OBSERVER" layout="swiper" />
			<main className="main">
				{/* <button onClick={handleDisplay}>{isShow ? "非表示" : "表示"}</button>
				{isShow ? <h1>{count}</h1> : null}

				<botton onClick={hendleClick}>カウント</botton>
				<botton onClick={handleAdd}>増えるよ</botton>

				<ul>
					{array.map((arrayele) => {
						return <li key={arrayele}>{arrayele}</li>;
					})}
				</ul>
				<input type="text" value={text} onChange={hendleText} /> */}
				{/* <motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ ease: "easeOut", duration: 1 }}
				> */}
				<section className="about">
					<h2 className="title">ABOUT</h2>
					<p className="inner">
						TEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなですTEXTtext漢字で実験文字サンプルテキストひらがなです
					</p>
				</section>
				{/* </motion.div> */}
				<section className="portfolio">
					<h2 className="title">PORTFOLIO</h2>

					<ul className="portfolio_list">
						{blog.map((blog) => (
							<li key={blog.title} className="">
								<Link href={`/portfolio/${blog.title}`}>
									<a>
										<p className="">{blog.title}</p>
										{<Image src={blog.thumbnail.url} width={300} height={200} />}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</section>
			</main>
			<Footer />
		</div>
	);
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
	const key = {
		headers: { "X-API-KEY": process.env.API_KEY },
	};
	const data = await fetch(
		"https://ratio-observatory.microcms.io/api/v1/contents",
		key
	)
		.then((res) => res.json())
		.catch(() => null);
	return {
		props: {
			blog: data.contents,
		},
	};
};
