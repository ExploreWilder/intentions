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
import { FormattedMessage } from "react-intl";

/**
 * Legal text with associated links.
 * @returns {JSX.Element}
 * @constructor
 */
const CopyrightNotice = () => {
    return (
        <>
            <em>
                <FormattedMessage id="pageHeaderTitle" />
            </em>{" "}
            · <FormattedMessage id="createdBy" />{" "}
            <a href="https://explorewilder.com/about">Clement</a> ·{" "}
            <a href="https://github.com/ExploreWilder/intentions/blob/main/LICENSE">
                Copyright
            </a>{" "}
            ·{" "}
            <a href="https://github.com/ExploreWilder/intentions/">
                <FormattedMessage id="source" />
            </a>{" "}
            ·{" "}
            <a href="https://explorewilder.statuspage.io/">
                <FormattedMessage id="status" />
            </a>
        </>
    );
};

export default CopyrightNotice;
