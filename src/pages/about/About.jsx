import React from "react";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import Novice from "../../images/novice.png";
import Apprentice from "../../images/apprentice.png";
import Practitioner from "../../images/practitioner.png";
import Mathematician from "../../images/mathematician.png";
import Prodigy from "../../images/prodigy.png";
import Expert from "../../images/expert.png";
import Grandmaster from "../../images/grandmaster.png";
import Archimedes from "../../images/archimedes.png";
import Pythagoras from "../../images/pythagoras.png";

const About = () => {
  return (
    <Row style={{ marginTop: "-90px" }}>
      <Col />
      <Col md="8">
        <Card>
          <CardHeader>
            <h1>About</h1>
          </CardHeader>
          <CardBody>
            <h2>Rules</h2>
            <p style={{ fontWeight: "bold" }}>
              Please make sure you have read and understood everything in this
              section. Failure to comply with rules may lead to having your
              account permanently banned and your scores cleared.
            </p>
            <p>
              Do not pick a username or bio that is either political,
              controversial, rude, contains swearwords, etc.
            </p>
            <p>
              "Academic honesty" - do not use a calculator to get a higher score
            </p>
            <p>
              Scripting is not allowed. Using a program to insert answers
              automatically may get your account banned if we have reason to
              believe you have done so.
            </p>
            <hr />
            <h2>Understand The Game</h2>
            <p>
              You can pick between 5 different game modes: Add, Subtract,
              Multiply, Divide and Combo.
            </p>
            <p>Add only contains '+' questions, such as '2 + 2'</p>
            <p>Subtract only contains '-' questions, such as '3 - 1'</p>
            <p>Multiply only contains '*' questions, such as '3 * 4'</p>
            <p>Divide only contains '/' questions, such as '10 / 5'</p>
            <p>
              Combo contains questions from all of the above game modes,
              generated at random each time.
            </p>
            <p>Each game mode has 4 different levels</p>
            <p>
              Level 1 lasts for 30 seconds and only has the easiest questions.
            </p>
            <p>
              Level 2 lasts for 60 seconds and only has questions with medium
              difficulty.
            </p>
            <p>
              Level 3 lasts for 90 seconds and only has the hardest questions.
            </p>
            <p>
              Level All lasts for 180 seconds and contains all of the above,
              starting with level 1, which lasts for 30 seconds, then level 2,
              which lasts for 60 seconds, and, you guessed it, level 3, which
              lasts for 90 seconds.
            </p>
            <h3>How to Play</h3>
            <p>
              Once you are registered and logged in, you can choose 'Play' from
              the navigation bar at the top of your screen. If you are playing
              on a mobile or any other devide with a viewport that's narrower
              than 768 pixels, you can find it under the drop down menu marked
              with 3 lines at the top left corner of your screen.
            </p>
            <p>
              Pick a game and a level you wish to play. The counter starts as
              soon as you click on the 'Start' button, so be ready!
            </p>
            <p>
              To enter your answer, simply click on the relevant digits on the
              calculator field. If you wish to delete the last digit you
              entered, simply click on the 'Del' button. If you wish to clear
              your entire answer, click on the 'Clear' button. And lastly, to
              submit your answer, click on the 'Submit' button.
            </p>
            <p>
              If your answer is correct, your score will increase and you will
              immediately be presented with a new question.
            </p>
            <p>
              If your answer is incorrect, your score will stay the same and the
              background color of the page will go red. Simultaneously, the
              'Submit' button will be disabled for the next 2 seconds. When the
              2 seconds is over, the page's background color will turn back to
              normal and you will be presented with a new question.
            </p>
            <p>
              If you do not enter any digits into your answer and click
              'Submit,' you are submitting an empty answer and the result will
              be the same as entering an incorrect answer.
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Tip!</span> Submitting an
              empty answer may sometimes be beneficial. For example, if you are
              presented with a difficult equation, such as '34 * 23' and you
              only have 10 seconds left, it might be better to sacrifice another
              2 seconds in hopes of getting an easier equation to solve in the
              last 8 seconds, which could be '20 * 20' instead.
            </p>
            <p>
              Your score will only be submitted if the counter has reached 0 and
              you are no longer being presented with new questions. If you have
              surpassed your hiscore, but go to another page while the counter
              is still running, that score will not override your current
              hiscore, so be wary!
            </p>
            <h3>Ranks</h3>
            <p>
              When going to a user's profile page, right under their name is
              listed their rank. There are 9 ranks based on the average points
              you have across all 5 game modes' 'All' levels' points. If you
              have 2000 points in each game mode's 'All' level, you have an
              overall average of 2000 points.
            </p>
            <img className="badge-png" src={Novice} alt="novicebadge" />
            <p>
              Under 100 points average gives you a rank of
              <span style={{ fontWeight: "bold" }}> Novice</span>, which is what
              everyone starts out as when they first join the platform.
            </p>
            <img className="badge-png" src={Apprentice} alt="apprenticebadge" />
            <p>
              Next up is <span style={{ fontWeight: "bold" }}>Apprentice</span>,
              if you have 100 points or more on average.
            </p>
            <img
              className="badge-png"
              src={Practitioner}
              alt="practitionerbadge"
            />
            <p>
              <span style={{ fontWeight: "bold" }}>Practitioner </span>
              requires at least 1000 points.
            </p>
            <img
              className="badge-png"
              src={Mathematician}
              alt="mathematicianbadge"
            />
            <p>
              <span style={{ fontWeight: "bold" }}>Mathematician </span>
              requires at least 10 000 points.
            </p>
            <img className="badge-png" src={Prodigy} alt="Prodigybadge" />
            <p>
              <span style={{ fontWeight: "bold" }}>Prodigy</span> requires at
              least 50 000 points.
            </p>
            <img className="badge-png" src={Expert} alt="Expertbadge" />
            <p>
              <span style={{ fontWeight: "bold" }}>Expert</span> requires at
              least 100 000 points. If you reach this level, you are in the top
              1% in the world when it comes to calculating by heart.
            </p>
            <img
              className="badge-png"
              src={Grandmaster}
              alt="Grandmasterbadge"
            />
            <p>
              <span style={{ fontWeight: "bold" }}>Grandmaster</span> requires
              at least 150 000 points.
            </p>
            <img className="badge-png" src={Archimedes} alt="Archimedesbadge" />
            <p>
              <span style={{ fontWeight: "bold" }}>Archimedes</span> requires at
              least 200 000 points.
            </p>
            <img className="badge-png" src={Pythagoras} alt="Pythagorasbadge" />
            <p>
              <span style={{ fontWeight: "bold" }}>Pythagoras</span> requires at
              least 250 000 points on average. This is the final level on the
              platform and is designed to be unreachable for everyone, except a
              select few. If you reach this level, you are in the top 0.01%.
              Good luck!
            </p>
            <hr />
            <h2>Contact</h2>
            <p>
              With any questions, business inquiries, suggestions, bug reports,
              complaints, unban appeal, etc., please contact the developer via
              email at midendcode@gmail.com
            </p>
          </CardBody>
        </Card>
      </Col>
      <Col />
    </Row>
  );
};

export default About;
