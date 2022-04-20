const ChangeSlide = ({back, next}) => {
  return (
    <div className="slider-arrowBox">
      <div className="slider-arrow slider-arrow-left">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="#fff"
          className="slider-arrow--chevron"
          onClick={back}
        >
          <path
            d="M0 0h25c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0z"
            opacity=".3"
          ></path>
          <path
            d="M28.65 25.042c.001-.55-.218-1.078-.607-1.466l-6.906-6.906c-.812-.795-2.113-.788-2.916.016s-.8 2.104-.015 2.916l5.444 5.44-5.44 5.44c-.56.515-.795 1.296-.61 2.035s.762 1.316 1.5 1.503 1.52-.046 2.035-.606l6.906-6.906c.39-.388.607-.915.607-1.465z"
            opacity=".404"
          ></path>
        </svg>
      </div>
      <div className="slider-arrow" onClick={next}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          viewBox="0 0 50 50"
          fill="#fff"
          className="slider-arrow--chevron"
        >
          <path
            d="M0 0h25c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0z"
            opacity=".3"
          ></path>
          <path
            d="M28.65 25.042c.001-.55-.218-1.078-.607-1.466l-6.906-6.906c-.812-.795-2.113-.788-2.916.016s-.8 2.104-.015 2.916l5.444 5.44-5.44 5.44c-.56.515-.795 1.296-.61 2.035s.762 1.316 1.5 1.503 1.52-.046 2.035-.606l6.906-6.906c.39-.388.607-.915.607-1.465z"
            opacity=".404"
          ></path>
        </svg>
      </div>
    </div>
  )
}

export default ChangeSlide
