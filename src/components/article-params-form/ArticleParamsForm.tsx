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

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	currentParams: ArticleStateType;
	onApply: (params: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	currentParams,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentParams);
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			setFormState(currentParams);
		}
	}, [currentParams, isOpen]);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFontFamilyChange = (
		selectedOption: typeof defaultArticleState.fontFamilyOption
	) => {
		setFormState((prev) => ({
			...prev,
			fontFamilyOption: selectedOption,
		}));
	};

	const handleFontColorChange = (
		selectedOption: typeof defaultArticleState.fontColor
	) => {
		setFormState((prev) => ({
			...prev,
			fontColor: selectedOption,
		}));
	};

	const handleBackgroundColorChange = (
		selectedOption: typeof defaultArticleState.backgroundColor
	) => {
		setFormState((prev) => ({
			...prev,
			backgroundColor: selectedOption,
		}));
	};

	const handleContentWidthChange = (
		selectedOption: typeof defaultArticleState.contentWidth
	) => {
		setFormState((prev) => ({
			...prev,
			contentWidth: selectedOption,
		}));
	};

	const handleFontSizeChange = (
		selectedOption: typeof defaultArticleState.fontSizeOption
	) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: selectedOption,
		}));
	};

	const handleApply = () => {
		onApply(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<div className={styles.form}>
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
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</div>
			</aside>
		</>
	);
};
