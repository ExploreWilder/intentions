/*!
 * Web Application Generating Trip Intentions
 * Copyright (C) 2020 Clement
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import React from "react";
import { Collapse } from "antd";
import { useIntl } from "react-intl";
const { Panel } = Collapse;

/**
 * Component contained in the drawer. It's designed as a Frequently Asked Questions.
 * @returns {JSX.Element}
 * @constructor
 */
const About = () => {
    const { formatMessage } = useIntl();
    const sections = ["What", "How", "Privacy", "Security", "Me", "Support"];
    let panels = [];

    sections.forEach((section) => {
        panels.push(
            <Panel
                header={formatMessage({ id: `about${section}Title` })}
                key={panels.length}
                className="aboutPanel"
            >
                <p
                    dangerouslySetInnerHTML={{
                        __html: formatMessage({ id: `about${section}Desc` }),
                    }}
                ></p>
            </Panel>
        );
    });

    return (
        <Collapse defaultActiveKey={["0"]} accordion ghost>
            {panels}
        </Collapse>
    );
};

export default About;
