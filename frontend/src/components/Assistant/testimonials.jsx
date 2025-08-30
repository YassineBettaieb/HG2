import React from "react";

export const TestimonialsAs = () => {
  const testimonials = [
    {
      name: "Amine B.",
      img: "img/t1.jpg",
      text: "Grâce à HajjemGo, j’ai trouvé un barbier en moins de 5 minutes, juste à côté de chez moi. Application au top !"
    },
    {
      name: "Sami T.",
      img: "img/t2.jpg",
      text: "Je suis barbier et cette plateforme m’a permis d’attirer plus de clients. Très simple à utiliser."
    },
    {
      name: "Nadia L.",
      img: "img/t3.jpg",
      text: "J’ai pu réserver un rendez-vous pour mon frère très facilement. Interface claire, barbiers professionnels."
    }
  ];

  return (
    <div id="testimonials">
      <div className="container">
        <div className="section-title text-center">
          <h2>What our clients say</h2>
        </div>
        <div className="row">
          {testimonials.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              <div className="testimonial">
                <div className="testimonial-image">
                  <img src={d.img} alt={`Photo of ${d.name}`} />
                </div>
                <div className="testimonial-content">
                  <p>"{d.text}"</p>
                  <div className="testimonial-meta">- {d.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
