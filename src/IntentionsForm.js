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

import React, { Component } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {
    Form,
    Divider,
    DatePicker,
    Select,
    Input,
    List,
    Button,
    Modal,
    Typography,
    Popconfirm,
} from "antd";
import {
    FilePdfOutlined,
    UserAddOutlined,
    UserDeleteOutlined,
} from "@ant-design/icons";
import CharacterDetails from "./CharacterDetails";
import pdfGenerator from "./pdfGenerator";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

/**
 * List of members except the team leader.
 * @param props Callback function and members data except the team leader (first element).
 * @returns {JSX.Element}
 * @constructor
 */
const OtherTeamMembers = (props) => {
    const rows = props.membersData.map((memberData, index) => {
        const memberId = index + 1;
        return (
            <div key={`teamMember${memberId}`}>
                <Divider>
                    <FormattedMessage id="member" />
                </Divider>
                <CharacterDetails
                    isLeader={false}
                    memberData={memberData}
                    handleMember={props.handleMember(memberId)}
                    memberId={memberId}
                />
            </div>
        );
    });

    return <>{rows}</>;
};

/**
 * List all members (singleton or team).
 * @param props Callback function and members data (all members, one element if singleton).
 * @returns {JSX.Element}
 * @constructor
 */
const AllCharacterDetails = (props) => {
    const { membersData, handleMember } = props;

    if (membersData.length > 1) {
        const [, ...otherTeamMembers] = membersData; // exclude the team leader
        return (
            <>
                <Divider>
                    <Title level={4}>
                        <FormattedMessage id="aboutYou" /> (
                        <FormattedMessage id="teamLeader" />)
                    </Title>
                </Divider>
                <CharacterDetails
                    isLeader={true}
                    memberData={membersData[0]}
                    handleMember={handleMember(0)}
                    memberId={0}
                />
                <Divider>
                    <Title level={4}>
                        <FormattedMessage id="aboutYourTeamMembers" />
                    </Title>
                </Divider>
                <OtherTeamMembers
                    membersData={otherTeamMembers}
                    handleMember={handleMember}
                />
            </>
        );
    } else {
        return (
            <>
                <Divider>
                    <Title level={4}>
                        <FormattedMessage id="aboutYou" />
                    </Title>
                </Divider>
                <CharacterDetails
                    isLeader={true}
                    memberData={membersData[0]}
                    handleMember={handleMember(0)}
                    memberId={0}
                />
            </>
        );
    }
};

/**
 * Select a date/time range.
 * @returns {JSX.Element}
 * @constructor
 */
const TimeRange = () => {
    return (
        <Form.Item
            label={<FormattedMessage id="timeRangePickerLabel" />}
            name="timeRange"
        >
            <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
            />
        </Form.Item>
    );
};

/**
 * Select the activity.
 * TODO: Update other components (such as the essential gear list) based on the selected activity.
 * @returns {JSX.Element}
 * @constructor
 */
const Activity = () => {
    const { formatMessage } = useIntl();

    return (
        <Form.Item
            label={<FormattedMessage id="activityLabel" />}
            name="activity"
        >
            <Select style={{ width: 120 }}>
                <Option value={formatMessage({ id: "hiking" })}>
                    <FormattedMessage id="hiking" />
                </Option>
                <Option value={formatMessage({ id: "skiing" })}>
                    <FormattedMessage id="skiing" />
                </Option>
                <Option value={formatMessage({ id: "climbing" })}>
                    <FormattedMessage id="climbing" />
                </Option>
            </Select>
        </Form.Item>
    );
};

/**
 * Some textareas for the trip details. Textareas are automatically resized.
 * @returns {JSX.Element}
 * @constructor
 */
const TripDetails = () => {
    return (
        <>
            <Form.Item
                label={<FormattedMessage id="tripIntentionsDetailsLabel" />}
                extra={<FormattedMessage id="tripIntentionsDetailsExtra" />}
                name="tripIntentionsDetails"
            >
                <TextArea autoSize={{ minRows: 3, maxRows: 8 }} />
            </Form.Item>
            <Form.Item
                label={<FormattedMessage id="prePostTripIntentionsLabel" />}
                extra={<FormattedMessage id="prePostTripIntentionsExtra" />}
                name="prePostTripIntentions"
            >
                <TextArea autoSize={{ maxRows: 8 }} />
            </Form.Item>
            <Form.Item
                label={<FormattedMessage id="postTripIntentionsDetailsLabel" />}
                extra={<FormattedMessage id="postTripIntentionsDetailsExtra" />}
                name="postTripIntentionsDetails"
            >
                <TextArea autoSize={{ maxRows: 8 }} />
            </Form.Item>
        </>
    );
};

/**
 * Essential gear list with the possibility of adding custom gear not in the dropdown list.
 * A State Hook is used to use useIntl() and handle changes inside the component.
 * @returns {JSX.Element}
 * @constructor
 */
const GearList = () => {
    const [selectedItems, setSelectedItems] = React.useState([]); // nothing selected
    const [hasSatPhone, setHasSatPhone] = React.useState(false); // no phone
    const { formatMessage } = useIntl();
    const optionsGear = [];
    const satPhone = formatMessage({ id: "gear9" });
    const totalItems = 14;
    const availableWarnings = [1, 7, 13];

    React.useEffect(() => {
        setHasSatPhone(selectedItems.indexOf(satPhone) !== -1);
    }, [selectedItems, satPhone]); // re-run the effect only if updating the list

    for (let i = 1; i <= totalItems; i++) {
        const itemId = `gear${i}`;
        optionsGear.push(
            <Option key={itemId} value={formatMessage({ id: itemId })}>
                <FormattedMessage id={itemId} />
            </Option>
        );
    }

    /**
     * When the user remove an item without using the dropdown list, update the list.
     * @param deselectedItem Just the deleted items.
     */
    const handleDeselect = (deselectedItem) => {
        setSelectedItems(
            selectedItems.filter((value) => {
                return value !== deselectedItem;
            })
        );
    };

    /**
     * Keep track of the selected items.
     * @param newSelectedItems List of selected items.
     */
    const handleChange = (newSelectedItems) => {
        setSelectedItems(newSelectedItems);
    };

    /**
     * When the user leaves the dropdown menu. The blur event does not have the
     * list of selected items, that is why the onChange event is used.
     */
    const handleBlur = () => {
        let warnings = [];

        selectedItems.forEach((item) => {
            availableWarnings.some((idx) => {
                // find key from value
                const itemId = `gear${idx}`;
                const title = formatMessage({ id: itemId });
                const desc = formatMessage({ id: itemId + "warning" });

                if (title === item) {
                    warnings.push({
                        title: title,
                        description: desc,
                    });
                    return true; // stop looping over warnings
                }
                return false;
            });
        });

        if (warnings.length) {
            // specific information displayed in a modal
            Modal.info({
                title: formatMessage({ id: "gearWarning" }),
                width: 800,
                content: (
                    <List
                        itemLayout="horizontal"
                        bordered={true}
                        dataSource={warnings}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    ></List>
                ),
            });
        }
    };

    return (
        <>
            <Form.Item
                label={<FormattedMessage id="essentialGearLabel" />}
                extra={<FormattedMessage id="essentialGearExtra" />}
                name="essentialGear"
            >
                <Select
                    mode="tags"
                    placeholder={<FormattedMessage id="goingNude" />}
                    onChange={handleChange}
                    onDeselect={handleDeselect}
                    onBlur={handleBlur}
                >
                    {optionsGear}
                </Select>
            </Form.Item>
            <Form.Item
                label={<FormattedMessage id="satPhoneNumberLabel" />}
                style={hasSatPhone ? {} : { display: "none" }}
                name="satPhoneNumber"
                rules={[
                    {
                        required: hasSatPhone,
                        message: <FormattedMessage id="satPhoneNumberNotice" />,
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </>
    );
};

/**
 * Buttons for adding/removing a member. A popup is displayed on remove because it cannot be undone.
 * @param props Current state and callback function.
 * @returns {JSX.Element}
 * @constructor
 */
const AddRemoveMemberButtons = (props) => {
    const [visible, setVisible] = React.useState(false);
    const { members, addMember, removeMember } = props;
    const isAlone = members.length < 2;

    const showPopConfirm = () => {
        setVisible(true);
    };
    const handleConfirm = () => {
        setVisible(false);
        removeMember();
    };
    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Form.Item style={{ textAlign: "center" }}>
            <Button
                icon={<UserAddOutlined />}
                htmlType="button"
                onClick={addMember}
            >
                <FormattedMessage id="addMember" />
            </Button>
            {isAlone ? null : (
                <Popconfirm
                    title={<FormattedMessage id="popConfirmRemoveMember" />}
                    okText={<FormattedMessage id="popConfirmOkText" />}
                    onConfirm={handleConfirm}
                    cancelText={<FormattedMessage id="popConfirmCancelText" />}
                    onCancel={handleCancel}
                    visible={visible}
                    mouseLeaveDelay={0}
                >
                    <Button
                        icon={<UserDeleteOutlined />}
                        htmlType="button"
                        onClick={showPopConfirm}
                        style={{ margin: "0 8px" }}
                    >
                        <FormattedMessage id="removeMember" />
                    </Button>
                </Popconfirm>
            )}
        </Form.Item>
    );
};

/**
 * Entire form with all inputs required to generate the PDF.
 */
class IntentionsForm extends Component {
    /**
     * Start with a singleton.
     * @type {{members: [{}]}}
     */
    state = {
        members: [{}],
    };

    /**
     * Create a new PDF instance and generate the PDF.
     * @param data Members data and trip details.
     */
    newDoc = (data) => {
        // font styles are: normal, bold, italic, bolditalic
        this.doc = new pdfGenerator(
            [
                {
                    path: "fonts/life_savers/LifeSavers_Regular.ttf",
                    name: "myTitle",
                    style: "normal",
                },
                {
                    path: "fonts/life_savers/LifeSavers_Bold.ttf",
                    name: "myTitle",
                    style: "bold",
                },
                {
                    path: "fonts/andika_basic/AndikaNewBasic_R.ttf",
                    name: "myText",
                    style: "normal",
                },
                {
                    path: "fonts/andika_basic/AndikaNewBasic_B.ttf",
                    name: "myText",
                    style: "bold",
                },
                {
                    path: "fonts/andika_basic/AndikaNewBasic_I.ttf",
                    name: "myText",
                    style: "italic",
                },
            ],
            data,
            this.props.locale,
            this.props.lang
        );
    };

    /**
     * Add one empty member to the list of members.
     */
    addMember = () => {
        this.setState({
            members: [...this.state.members, {}],
        });
    };

    /**
     * Remove the last member.
     */
    removeMember = () => {
        let members = this.state.members;
        members.pop();
        this.setState({
            members: members,
        });
    };

    /**
     * Update the state of one member.
     * @param idx Member ID.
     * @returns {function(*): void} Handler for the identified member.
     */
    handleMember = (idx) => (newMemberData) => {
        const newMembers = this.state.members.map((member, map_idx) => {
            return idx === map_idx ? newMemberData : member;
        });

        this.setState({
            members: newMembers,
        });
    };

    /**
     * When the user submit the intentions form: generate the PDF.
     * @param values
     */
    onFinish = (values) => {
        this.newDoc({ ...values, members: this.state.members });
    };

    render() {
        return (
            <Form
                layout="vertical"
                className="intentionsForm"
                onFinish={this.onFinish}
            >
                <Divider>
                    <Title level={4}>
                        <FormattedMessage id="aboutYourTrip" />
                    </Title>
                </Divider>
                <TimeRange />
                <Activity />
                <TripDetails />
                <AllCharacterDetails
                    membersData={this.state.members}
                    handleMember={this.handleMember}
                />
                <Divider />
                <AddRemoveMemberButtons
                    members={this.state.members}
                    addMember={this.addMember}
                    removeMember={this.removeMember}
                />
                <Divider>
                    <Title level={4}>
                        <FormattedMessage id="equipment" />
                    </Title>
                </Divider>
                <GearList />
                <Divider />
                <Form.Item style={{ textAlign: "center" }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<FilePdfOutlined />}
                    >
                        <FormattedMessage id="generatePDF" />
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default IntentionsForm;
