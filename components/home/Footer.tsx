import Link from "next/link";
import React from "react";
import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from "../../constant";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flexCenter mb-24 pt-20">
      <div className="padding-container max-container flex w-full flex-col gap-14">
        <div className="flex flex-col item-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10 bold-20">
            TRAVELLIAN
          </Link>
          <div className="flex flex-wrap gap-8 sm:justify-between md:flex-1">
            {FOOTER_LINKS.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                 <h4 className="bold-18 whitespace-nowrap">{col.title}</h4>
                <ul className="flex flex-col gap-4 reguler-14 text-gray-20">
                  {col.links.map((link) => (
                    <Link href="" key={link}>
                      {link}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
            <FooterColumn title={FOOTER_CONTACT_INFO.title}>
              {FOOTER_CONTACT_INFO.links.map((link) => (
                <Link
                  href=""
                  key={link.label}
                  className="flex gap-4 md:flex-col lg:flex-row"
                >
                  <p>{link.label}:</p>
                  <p className="medium-14">{link.value}</p>
                </Link>
              ))}
            </FooterColumn>
            <div className="flex">
              <FooterColumn title={SOCIALS.title}>
                <ul className="flex gap-4">
                  {SOCIALS.links.map((link) => (
                    <Link href="" key={link}>
                      <Image src={link} alt="logo" height={22} width={22} />
                    </Link>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
};

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="bold-18 whitespace-nowrap">{title}</h4>
      {children}
    </div>
  );
};

export default Footer;
