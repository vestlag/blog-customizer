import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useCloseOnOutsideClickOrEsc } from 'src/hooks/useCloseOnOutsideClickOrEsc';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
}

type FormField = keyof ArticleStateType;

export const ArticleParamsForm = ({
	currentParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentParams);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useCloseOnOutsideClickOrEsc({
		isOpenElement: isOpen,
		elementRef: sidebarRef,
		onClose: () => setIsOpen(false),
	});

	useEffect(() => {
		if (isOpen) {
			setFormState(currentParams);
		}
	}, [currentParams, isOpen]);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	const handleFieldChange = (fieldName: FormField, value: any) => {
		setFormState((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	const handleFontFamilyChange = (
		selectedOption: typeof defaultArticleState.fontFamilyOption
	) => {
		handleFieldChange('fontFamilyOption', selectedOption);
	};

	const handleFontColorChange = (
		selectedOption: typeof defaultArticleState.fontColor
	) => {
		handleFieldChange('fontColor', selectedOption);
	};

	const handleBackgroundColorChange = (
		selectedOption: typeof defaultArticleState.backgroundColor
	) => {
		handleFieldChange('backgroundColor', selectedOption);
	};

	const handleContentWidthChange = (
		selectedOption: typeof defaultArticleState.contentWidth
	) => {
		handleFieldChange('contentWidth', selectedOption);
	};

	const handleFontSizeChange = (
		selectedOption: typeof defaultArticleState.fontSizeOption
	) => {
		handleFieldChange('fontSizeOption', selectedOption);
	};

	// Обработчик отправки формы
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
		setIsOpen(false);
	};

	// Обработчик сброса формы
	const handleFormReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleFormReset}>
					<h2
						style={{
							fontSize: '24px',
							fontWeight: 'bold',
							marginBottom: '30px',
							textAlign: 'center',
						}}>
						Настройки статьи
					</h2>

					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<label style={{ fontSize: '14px', fontWeight: '600' }}>
								Шрифт
							</label>
							<Select
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFontFamilyChange}
								title=''
							/>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<label style={{ fontSize: '14px', fontWeight: '600' }}>
								Размер шрифта
							</label>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={handleFontSizeChange}
								title=''
							/>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<label style={{ fontSize: '14px', fontWeight: '600' }}>
								Цвет текста
							</label>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFontColorChange}
								title=''
							/>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<label style={{ fontSize: '14px', fontWeight: '600' }}>
								Цвет фона
							</label>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleBackgroundColorChange}
								title=''
							/>
						</div>

						<div
							style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
							<label style={{ fontSize: '14px', fontWeight: '600' }}>
								Ширина контента
							</label>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={handleContentWidthChange}
								title=''
							/>
						</div>
					</div>

					<Separator />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
