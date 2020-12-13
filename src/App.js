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
import { Layout, Menu, BackTop, ConfigProvider, Modal, Typography } from "antd";
import {
    TranslationOutlined,
    QuestionOutlined,
    HeartOutlined,
} from "@ant-design/icons";
import { IntlProvider, FormattedMessage } from "react-intl";
import CopyrightNotice from "./CopyrightNotice";
import About from "./About";
import IntentionsForm from "./IntentionsForm";
import enGB from "antd/lib/locale/en_GB";
import "moment/locale/en-gb";
import frFR from "antd/lib/locale/fr_FR";
import "moment/locale/fr";
import moment from "moment";
import "antd/dist/antd.css";
const { Footer, Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

// moment is required for full translations in antd components
moment.locale("en-gb");

/**
 * The entire application.
 */
class App extends Component {
    /**
     * Load translations from JSON files.
     */
    translations = {
        en: require("./lang/en.json"),
        fr: require("./lang/fr.json"),
    };

    /**
     * Default state of the application. Default language is English.
     */
    state = {
        currentLocale: "en",
        currentAntLocale: enGB,
        visibleAbout: false,
        visibleSupport: false,
    };

    /**
     * Return the antd locale data.
     * @param newLocale The language to select ("en" or "fr").
     * @returns {Locale} The antd locale data.
     */
    getAntLocale = (newLocale) => {
        switch (newLocale) {
            case "fr":
                return frFR;
            default:
                return enGB;
        }
    };

    /**
     * Change the application locale.
     * @param event Contains the language to choose.
     */
    handleLanguage = (event) => {
        const newLocale = event.key;

        this.setState({
            ...this.state,
            currentLocale: newLocale,
            currentAntLocale: this.getAntLocale(newLocale),
        });

        switch (newLocale) {
            case "fr":
                moment.locale("fr");
                break;
            default:
                moment.locale("en-gb");
        }
    };

    /**
     * When the "About" modal is closed.
     */
    onCloseAbout = () => {
        this.setState({
            ...this.state,
            visibleAbout: false,
        });
    };

    /**
     * Show the "About" modal.
     */
    showAbout = () => {
        this.setState({
            ...this.state,
            visibleAbout: true,
        });
    };

    /**
     * When the "Support" modal is closed.
     */
    handleCancelSupport = () => {
        this.setState({
            ...this.state,
            visibleSupport: false,
        });
    };

    /**
     * Show the "Support" modal.
     */
    showSupport = () => {
        this.setState({
            ...this.state,
            visibleSupport: true,
        });
    };

    render() {
        const {
            currentLocale,
            currentAntLocale,
            visibleAbout,
            visibleSupport,
        } = this.state;

        return (
            <IntlProvider
                messages={this.translations[currentLocale]}
                locale={currentLocale}
                defaultLocale="en"
            >
                <ConfigProvider locale={currentAntLocale}>
                    <Modal
                        title={<FormattedMessage id="about" />}
                        visible={visibleAbout}
                        className="modalAbout"
                        onCancel={this.onCloseAbout}
                        footer={<CopyrightNotice />}
                    >
                        <About />
                    </Modal>
                    <Modal
                        title={<FormattedMessage id="aboutSupportTitle" />}
                        visible={visibleSupport}
                        onCancel={this.handleCancelSupport}
                        cancelText={<FormattedMessage id="close" />}
                        okText={
                            <a href="https://ko-fi.com/explorewilder">
                                <FormattedMessage id="buyMeACoffee" />
                            </a>
                        }
                    >
                        <p
                            dangerouslySetInnerHTML={{
                                __html: this.translations[currentLocale][
                                    "aboutSupportDesc"
                                ],
                            }}
                        ></p>
                    </Modal>
                    <BackTop />
                    <Layout>
                        <Sider className="largeScreenSizeMenu">
                            <Menu
                                mode="inline"
                                theme="dark"
                                selectedKeys={[currentLocale]}
                            >
                                <SubMenu
                                    key="sub1"
                                    icon={<TranslationOutlined />}
                                    title={<FormattedMessage id="language" />}
                                    onClick={this.handleLanguage}
                                    style={{ width: 200 }}
                                >
                                    <Menu.Item key="en">English</Menu.Item>
                                    <Menu.Item key="fr">Français</Menu.Item>
                                </SubMenu>
                                <Menu.Item
                                    key="about"
                                    icon={<QuestionOutlined />}
                                    onClick={this.showAbout}
                                >
                                    <FormattedMessage id="about" />
                                </Menu.Item>
                                <Menu.Item
                                    key="support"
                                    icon={<HeartOutlined />}
                                    onClick={this.showSupport}
                                >
                                    <FormattedMessage id="support" />
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout className="expandedSider">
                            <Menu
                                mode="horizontal"
                                className="smallScreenSizeMenu"
                                theme="dark"
                                selectedKeys={[currentLocale]}
                            >
                                <SubMenu
                                    key="sub1"
                                    icon={<TranslationOutlined />}
                                    title={<FormattedMessage id="language" />}
                                    onClick={this.handleLanguage}
                                >
                                    <Menu.Item key="en">English</Menu.Item>
                                    <Menu.Item key="fr">Français</Menu.Item>
                                </SubMenu>
                                <Menu.Item
                                    key="about"
                                    icon={<QuestionOutlined />}
                                    onClick={this.showAbout}
                                >
                                    <FormattedMessage id="about" />
                                </Menu.Item>
                                <Menu.Item
                                    key="support"
                                    icon={<HeartOutlined />}
                                    onClick={this.showSupport}
                                >
                                    <FormattedMessage id="support" />
                                </Menu.Item>
                            </Menu>
                            <Content className="intentionsContent">
                                <Header className="imageHeader">
                                    <div className="imageTitle">
                                        <img
                                            src="/images/header.jpg"
                                            alt="Snow On The Ridge"
                                        />
                                        <div className="textAboveImage">
                                            <Title>
                                                <FormattedMessage id="pageHeaderTitle" />
                                            </Title>
                                            <Title level={3}>
                                                <FormattedMessage id="pageHeaderSubTitle" />
                                            </Title>
                                        </div>
                                    </div>
                                </Header>
                                <IntentionsForm
                                    locale={this.translations[currentLocale]}
                                    lang={currentLocale}
                                />
                            </Content>
                            <Footer className="intentionsFooter">
                                <CopyrightNotice />
                            </Footer>
                        </Layout>
                    </Layout>
                </ConfigProvider>
            </IntlProvider>
        );
    }
}

export default App;
