import { h } from 'preact';
import classNames from 'classnames';
import BrandIcon from './BrandIcon';
import DualBrandingIcon from './DualBrandingIcon/DualBrandingIcon';
import Field from '../../../../internal/FormFields/Field';
import useCoreContext from '../../../../../core/Context/useCoreContext';
import { CardNumberProps } from './types';
import styles from '../CardInput.module.scss';
import DataSfSpan from './DataSfSpan';

export default function CardNumber(props: CardNumberProps) {
    const { i18n } = useCoreContext();
    const { error = '', isValid = false, onFocusField = () => {}, dualBrandingElements, dualBrandingChangeHandler, dualBrandingSelected } = props;

    return (
        <Field
            label={props.label}
            focused={props.focused}
            filled={props.filled}
            classNameModifiers={['cardNumber']}
            onFocusField={() => onFocusField('encryptedCardNumber')}
            errorMessage={error && i18n.get(error)}
            isValid={isValid}
            dualBrandingElements={dualBrandingElements}
            dir={'ltr'}
            name={'encryptedCardNumber'}
        >
            <DataSfSpan
                encryptedFieldType={'encryptedCardNumber'}
                className={classNames({
                    'adyen-checkout__input': true,
                    'adyen-checkout__input--large': true,
                    'adyen-checkout__card__cardNumber__input': true,
                    [styles['adyen-checkout__input']]: true,
                    'adyen-checkout__input--error': error,
                    'adyen-checkout__input--focus': props.focused,
                    'adyen-checkout__input--valid': isValid,
                    'adyen-checkout__card__cardNumber__input--noBrand': !props.showBrandIcon
                })}
            >
                {props.showBrandIcon && !dualBrandingElements && <BrandIcon brandsConfiguration={props.brandsConfiguration} brand={props.brand} />}
            </DataSfSpan>

            {dualBrandingElements && !error && (
                <div
                    className={classNames([
                        'adyen-checkout__card__dual-branding__buttons',
                        { 'adyen-checkout__card__dual-branding__buttons--active': isValid }
                    ])}
                >
                    {dualBrandingElements.map(element => (
                        <DualBrandingIcon
                            key={element.id}
                            brand={element.id}
                            brandsConfiguration={props.brandsConfiguration}
                            onClick={dualBrandingChangeHandler}
                            dataValue={element.id}
                            notSelected={dualBrandingSelected !== '' && dualBrandingSelected !== element.id}
                        />
                    ))}
                </div>
            )}
        </Field>
    );
}
