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

import { Steps } from "antd";
import React from "react";
import { useIntl } from "react-intl";

const { Step } = Steps;

/**
 * Content of the modal used as feedback when the PDF has been successfully generated.
 * @returns {JSX.Element}
 * @constructor
 */
const ModalPdfCreationSuccess = () => {
    const { formatMessage } = useIntl();
    let todo = [];
    for (let i = 0; i <= 4; i++) {
        todo.push(
            <Step
                title={formatMessage({ id: "onPdfSuccessContentStep" + i })}
            />
        );
    }

    return (
        <Steps direction="vertical" size="small" current={1}>
            {todo}
        </Steps>
    );
};

export default ModalPdfCreationSuccess;
