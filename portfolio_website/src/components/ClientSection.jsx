import LogoLoop from './LogoLoop'
import logo from '../assets/logo.png'


export default function SchoolSection() {

    const schoolData = [
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
        {
            alt: 'Happy Client',
            src: logo,
        },
    ]
    
    return (
        <section className="school" id='school'>
            <div className="container">
                <h2 className='section-title'>Over thousands of schools worldwide</h2>
                <p className="rider" style={{color: 'var(--burgundy)'}}>Guiding You Through Every Step of Your Study-Abroad Dream</p>

                <div className="school-wrapper">

                    <div style={{ height: '100px', position: 'relative', overflow: 'hidden'}}>
                        {/* Basic horizontal loop */}
                        <LogoLoop
                            logos={schoolData}
                            speed={50}
                            direction="left"
                            logoHeight={40}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="#fff"
                            ariaLabel="Technology partners"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

function School({ image, name }) {
    return (
        <div className="school">
            <img src={image} alt={name} />
        </div>
    )
}
