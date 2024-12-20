import { useEffect } from "react";
import { apiGetExample } from "../../services/examples";
import { useTranslation, withTranslation } from "react-i18next";
import { langVars } from "../../utils/constants"

const ExampleMultiLang = (props) => {

    const { t } = props
    const { i18n } = useTranslation();
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    useEffect(() => {
        apiGetExample()
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.error(err.message)
            })
    }, [])

    return (
        <div style={{
            display: "flex", gap: "10px", flexDirection: "column"
        }}>
            <div>MultiLang example</div>
            <select onChange={(e) => handleChangeLanguage(e.target.value)}>
                <option value={langVars.en.value}>EN</option>
                <option value={langVars.vi.value}>VI</option>
            </select>
            <div>
                {t("multilang_example")}
            </div>
        </div>
    )
}

export default withTranslation()(ExampleMultiLang)