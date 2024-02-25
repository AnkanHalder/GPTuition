import React from 'react'
import HeroDescription from '../page_components/HeroDescription'
import HeroText from '../page_components/HeroText'
import FeatureCard from '../page_components/FeatureCard'

const FreeResources = () => {
  return (
    <div>
        <HeroText span=" Free Resources And Libraries " />
        <HeroDescription text="Unleash your learning potential with these exceptional online libraries, offering a treasure trove of educational resources for all! Explore the vast collection of Indian materials in the National Digital Library of India, delve into over 60,000 free classic ebooks at Project Gutenberg, and step into a world of 'one web page for every book ever published' with Open Library. Register for free, utilize intuitive search tools, download resources for easy access, and empower yourself through continuous learning. Start your journey today and unlock a world of knowledge! (Links to NDLI, Project Gutenberg, and Open Library websites are included.) " />
        <div className=" flex-center flex-col gap-6 w-full">
            <FeatureCard
                heading={" National Digital Library Of India "}
                desc={" National Digital Library of India (NDLI). The National Digital Library of India (NDLI) is a virtual treasure trove of learning resources established in 2006 by the Ministry of Education, Government of India. It's much more than just a repository; it offers a wide range of services for learners of all ages and backgrounds.  "}
                colorScheme={" bg-sec "}
                text={"Visit"}
                href={"https://ndl.iitkgp.ac.in/"}
            />
            <FeatureCard
                heading={" Open Library "}
                desc={`
                Open Library's Mission To create "one web page for every book ever published.
                Houses over 4 million ebooks with a focus on both classic and newer works.
                Collaborates with libraries worldwide to provide access to their books through lending and borrowing.
                Offers additional features like book reviews, author information, and integration with library catalogs.
                Some ebooks are freely available, while others require borrowing through a participating library or purchasing through an affiliated bookstore.
                `}
                colorScheme={" bg-sec "}
                text={"Visit"}
                href={"https://openlibrary.org/"}
            />
            <FeatureCard
                heading={" Project Gutenberg "}
                desc={` Project Gutenberg's Mission is To encourage the creation and distribution of ebooks, making public domain works freely accessible to everyone.
                Free eBooks: Offers over 60,000 ebooks in various formats (plain text, PDF, ePub, Kindle) with no registration needed for access.
                Primarily consists of older works whose copyright has expired, focusing on classic literature and historical documents.
                `}
                colorScheme={" bg-sec "}
                text={"Visit"}
                href={"https://www.gutenberg.org/"}
            />
        </div>
    </div>
  )
}

export default FreeResources