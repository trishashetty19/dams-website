import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/ui/loader";

const DogsPage = () => {
	const [dogs, setDogs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDogs = async () => {
			try {
				const response = await fetch("/api/dogBreed");
				const data = await response.json();
				setDogs(data);
			} catch (error) {
				console.error("Error fetching dogs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDogs();
	}, []);

	if (loading)
		return (
			<div className="w-full min-h-full flex items-center justify-center">
				<Loader />
			</div>
		);
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 h-full p-8">
			{dogs.length === 0 && <p>NO DOGS FOUND</p>}
			{dogs.map((dog) => (
				<div
					key={dog.id}
					className="card bg-card border border-border w-fit h-fit shadow-lg p-4 rounded-lg"
				>
					<Image
						src={dog.imageUrl || "/placeholder-image.png"}
						alt={dog.name}
						width={500}
						height={500}
						className="w-full h-48 object-cover rounded-lg mb-4"
					/>
					<h2 className="text-xl font-semibold text-card-foreground">
						{dog.name}
					</h2>
					<p className="text-card-foreground/50">
						Country of Origin: {dog.countryOfOrigin}
					</p>
					<p className="text-card-foreground/50">Fur Color: {dog.furColor}</p>
					<p className="text-card-foreground/50">Height: {dog.height} inches</p>
					<p className="text-card-foreground/50">Eye color: {dog.eyeColor}</p>
					<p className="text-card-foreground/50">
						Longevity: {dog.longevity} Years
					</p>
					<p className="text-card-foreground/50">
						Character Traits: {dog.characterTraits}
					</p>
					<p className="text-card-foreground/50">
						Common Health Problem: {dog.commonHealthProblems}
					</p>
					<Link
						href={`/dogBreed/${dog.id}`}
						className="text-primary hover:underline mt-2 block"
					>
						View More
					</Link>
				</div>
			))}
		</div>
	);
};

export default DogsPage;
