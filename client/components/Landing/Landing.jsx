import Image from 'next/image'
import Button from "$components/ui/Button";
import Comment from "$components/ui/Comment";
import Customer from './Customer'
import Blog from './Blog'
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react'
import comment1 from '$assets/images/comments/comment1.jpg'
import comment2 from '$assets/images/comments/comment2.jpg'
import comment3 from '$assets/images/comments/comment3.jpg'
import musicians from '$assets/images/customers/musicians.jpeg'
import podcasters from '$assets/images/customers/podcasters.jpg'
import gamers from '$assets/images/customers/gamers.jpg'
import dummyImg from '$assets/images/dummyVideo.png'
import blog1 from '$assets/images/blogs/1.jpg'
import blog2 from '$assets/images/blogs/2.jpg'
import blog3 from '$assets/images/blogs/3.jpg'
import plans from '$assets/images/plans.png'
import {IoSearchOutline} from 'react-icons/io5'
import styles from './Landing.module.scss'
import "swiper/components/pagination/pagination.min.css"


SwiperCore.use([Autoplay, Pagination]);

const comments = [
    {
        flexDir: "row",
        imgDetails: {
            src: comment1,
            alt: "comment1",
            width: 420,
            height: 420
        },
        title: "Develop a recurring income stream",
        description: "Stop rolling the dice of ad revenue and per-stream payouts. Get recurring income through monthly payments from your patrons",
        name: "Albert Abramav",
        job: "Developer",
        info: "The reliable monthly income has made it possible for me to spend less time chasing checks and more time creating.",
    },
    {
        flexDir: "row-reverse",
        imgDetails: {
            src: comment2,
            alt: "comment2",
            width: 420,
            height: 420
        },
        title: "Take back creative control",
        description: "Create what you want and what your audience loves. You don’t have to" +
            " conform to popular taste or the constraints of ad-based monetization models.",
        name: "Baratunde Thurston",
        job: "Writer, comedian, commentator",
        info: "Twenty years into my career, I realize I’ve been scattering my creativity and energy, chasing the approval of algorithms or network executives.",
    },
    {
        flexDir: "row",
        imgDetails: {
            src: comment3,
            alt: "comment3",
            width: 420,
            height: 420
        },
        title: "Build a direct, meaningful connection with your audience",
        description: "No ads, no trolls, no algorithms. Enjoy direct access and deeper conversations with" +
            " the people who matter the most.",
        name: "Heather McDonald",
        job: "Juicy Scoop Podcast",
        info: "With Patreon, it’s not about likes and views, you can really connect with your fans," +
            " ignore the haters and focus on the positive. I’d rather have 300 patrons than 3 million Instagram followers.",
    },

]

const customers = [
    {
        imgDetails: {
            src: musicians,
            alt: "musicians",
            width: 500,
            height: 350
        },
        title: "PATREON FOR MUSICIAN",
        description: "Connect directly and build community with your most engaged fans. Test new work in a supportive environment. Establish a reliable, recurring revenue stream."
    },
    {
        imgDetails: {
            src: podcasters,
            alt: "podcasters",
            width: 500,
            height: 400
        },
        title: "PATREON FOR PODCASTERS",
        description: "Creating a successful podcast shouldn’t involve compromising your vision," +
            " so stop letting advertisers and networks call the shots. Grow your show your way with support from the listeners who never miss an episode."
    },
    {
        imgDetails: {
            src: gamers,
            alt: "gamers",
            width: 500,
            height: 350
        },
        title: "PATREON FOR GAMING CREATORS",
        description: "200,000+ creators use Patreon to run their creative membership business."
    },

]

const blogs = [
    {
        imgDetails: {
            src: blog1,
            alt: "blog1",
            width: 150,
            height: 200
        },
        title: "Is Patreon Right For You And Your Business?",
        description: "In this article, we want to introduce you to the membership model—an" +
            " effective, field-tested way for independent creators...",
        href: "/blog1"
    },
    {
        imgDetails: {
            src: blog2,
            alt: "blog2",
            width: 150,
            height: 200
        },
        title: "6 Membership-based Business Models You Can Use On Patreon Today",
        description: "If you’ve looked at what other creators are doing on Patreon, it can be" +
            " daunting to see how many different ways they leverage...",
        href: "/blog2"
    },
    {
        imgDetails: {
            src: blog3,
            alt: "blog3",
            width: 150,
            height: 200
        },
        title: "The 20 Most Useful Patreon Features & Integrations",
        description: "As a creator, it's easy to feel like there just aren't enough hours in the" +
            " day. Whether you're working on your project part time...",
        href: "/blog3"
    },

]


export default function Landing() {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headers}>
                    <h1 className={styles.heading}>
                        Change the way art is valued
                    </h1>
                    <h3 className={styles.caption}>
                        Let your most passionate fans support your creative work via monthly
                        membership.
                    </h3>
                    <Button href="/signin">
                        Get Started
                    </Button>
                </div>
                <div className={styles.image}>
                    <Image src={dummyImg} alt="dummy img"/>
                </div>
            </div>

            <div className={styles.search}>
                <h1>
                    Search the 200,000+ creators on Patreon
                </h1>
                <div>
                    <span style={{marginRight: '-1.6rem', zIndex: 1}}>
                      <IoSearchOutline/>
                    </span>
                    <input placeholder="Find a creator you love" type="text"/>
                </div>
                <Button href="/search">
                    Search
                </Button>
            </div>

            <div className={styles.about}>
                <h1>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    What's Patreon?
                </h1>
                <p>
                    On Patreon, you can let your fans become active participants in the work
                    they
                    love by offering them a monthly membership. You give them access to
                    exclusive
                    content, community, and insight into your creative process. In exchange, you
                    get
                    the freedom to do your best work, and the stability you need to build an
                    independent creative career.

                </p>
            </div>

            <div>
                {comments.map(comment => (
                    <Comment key={comment.name} {...comment}/>
                ))}
            </div>

            <div className={styles.customers}>
                <h1 className={styles.title}>
                    Who uses Patreon?
                </h1>
                <p className={styles.description}>
                    If you’re ready to take your work to the next level and willing to open your
                    heart to your audience, Patreon is for you.
                </p>
            </div>

            <div>
                <Swiper
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    grabCursor
                    pagination={{
                        clickable: true
                    }}>

                    {customers.map(customer => (
                        <SwiperSlide key={customer.title}>
                            <Customer {...customer}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={styles.plans}>
                <Image src={plans} width={960} height={543.25} alt="plans"/>
            </div>

            <div className={styles.blogs}>
                <h1>
                    See how other creators use Patreon
                </h1>
                <div className={styles.blogContainer}>
                    {blogs.map(blog => (
                        <Blog key={blog.title} {...blog}/>
                    ))}
                </div>
            </div>


            <div className={styles.callToAction}>
                <h1>
                    Are you ready to take back control?
                </h1>
                <Button href="/signin">
                    Get Started
                </Button>
            </div>
        </div>
    )
}