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
import {
    Layout,
    Menu,
    BackTop,
    ConfigProvider,
    Drawer,
    Modal,
    Typography,
} from "antd";
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
        collapsedSider: false,
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
     * When the "About" drawer is closed.
     */
    onCloseAbout = () => {
        this.setState({
            ...this.state,
            visibleAbout: false,
        });
    };

    /**
     * Show the "About" drawer.
     */
    showAbout = () => {
        this.setState({
            ...this.state,
            visibleAbout: true,
        });
    };

    /**
     * When the "Support" modale is closed.
     */
    handleCancelSupport = () => {
        this.setState({
            ...this.state,
            visibleSupport: false,
        });
    };

    /**
     * Show the "Support" modale.
     */
    showSupport = () => {
        this.setState({
            ...this.state,
            visibleSupport: true,
        });
    };

    /**
     * When the sider is (un)collapsed.
     * @param collapsed
     */
    onCollapse = (collapsed) => {
        this.setState({
            ...this.state,
            collapsedSider: collapsed,
        });
    };

    render() {
        const {
            currentLocale,
            currentAntLocale,
            visibleAbout,
            visibleSupport,
            collapsedSider,
        } = this.state;

        return (
            <IntlProvider
                messages={this.translations[currentLocale]}
                locale={currentLocale}
                defaultLocale="en"
            >
                <ConfigProvider locale={currentAntLocale}>
                    <Drawer
                        title={<FormattedMessage id="about" />}
                        placement="right"
                        closable={false}
                        visible={visibleAbout}
                        onClose={this.onCloseAbout}
                        width={768}
                        footer={<CopyrightNotice />}
                    >
                        <About />
                    </Drawer>
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
                        <Sider
                            collapsible
                            collapsed={collapsedSider}
                            onCollapse={this.onCollapse}
                            style={{
                                overflow: "auto",
                                height: "100vh",
                                position: "fixed",
                                left: 0,
                            }}
                        >
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
                        <Layout
                            style={{ marginLeft: collapsedSider ? 80 : 200 }}
                        >
                            <Content className="intentionsContent">
                                <Header
                                    style={{
                                        minHeight: 370,
                                        padding: 0,
                                        marginTop: 24,
                                    }}
                                >
                                    <div className="imageTitle">
                                        <img
                                            width={900}
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
