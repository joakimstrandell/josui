import { Container } from "@josui/react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <div className="border-border -mt-2 border-t-8">
      <Container padding="top-bottom" paddingSize="md" width="wider" asChild>
        <footer className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <p className="leading-7">
            © {new Date().getFullYear()}
            <br /> Joakim Strandell <br />
            <a className="footer-link" href="https://awkwardgroup.com">
              Awkward Group AB
            </a>
          </p>
          <div>
            <h4 className="mb-2 font-bold">
              <Link className="footer-link" to="/work">
                Work
              </Link>
            </h4>
            <ul>
              <li>
                <Link className="footer-link" to="/work" search={{ category: "professional" }}>
                  Client Work
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/work" search={{ category: "personal" }}>
                  Personal Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-bold">
              <Link className="footer-link" to="/readme">
                Readme
              </Link>
            </h4>
            <ul>
              <li>
                <Link className="footer-link" to="/readme" hash="philosophy">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/readme" hash="stack">
                  Work Stack
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-bold">
              <Link className="footer-link" to="/connect">
                Connect
              </Link>
            </h4>
            <ul>
              <li>
                <a className="footer-link" href="https://linkedin.com/in/joakimstrandell">
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="footer-link" href="https://github.com/joakimstrandell">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </Container>
    </div>
  );
}
