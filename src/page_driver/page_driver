import { By, until, WebDriver, WebElement, WebElementCondition } from 'selenium-webdriver';

type ActionType = 'click' | 'addText';

type ElementAction = {
  cssSelector: string;
  type: ActionType;
  text?: string;
};

type CheckElementTextParam = {
  targetElementCssSelector: string;
  text: string;
};

type getDropdownItemByCssParam = {
  dropdownCssSelector: string;
  dropdownItemCssSelector: string;
};
class PageDriverController {
  private driver: WebDriver;
  private waitTime = 15000;

  constructor(driver: WebDriver, waitTime?: number) {
    this.driver = driver;
    if (waitTime) {
      this.waitTime = waitTime;
    }
  }

  async loadPage(url: string, pageLoadCondition: WebElementCondition | undefined = undefined): Promise<void> {
    await this.driver.get(url);
    if (pageLoadCondition) {
      await this.driver.wait(pageLoadCondition, this.waitTime);
    }
  }

  getElementByCss(cssSelector: string): WebElement | null {
    const locator = By.css(cssSelector);
    let targetElement: WebElement | null;
    try {
      targetElement = this.driver.findElement(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }

  async getAllElementByCss(cssSelector: string): Promise<WebElement[] | null> {
    const locator = By.css(cssSelector);
    let targetElement: WebElement[] | null;
    try {
      targetElement = await this.driver.findElements(locator);
    } catch {
      targetElement = null;
    }

    return targetElement;
  }

  async wait(waitEndCondition: WebElementCondition): Promise<void> {
    await this.driver.wait(waitEndCondition, this.waitTime);
  }

  async waitCssElement(waitedElementCssSelector: string): Promise<void> {
    await this.driver.wait(until.elementLocated(By.css(waitedElementCssSelector)), this.waitTime);
  }

  async elementAction(action: ElementAction): Promise<void> {
    const { cssSelector, type, text } = action;
    const targetElement = this.getElementByCss(cssSelector);
    if (!targetElement) {
      throw Error('element does not exist');
    }

    switch (type) {
      case 'click':
        await targetElement.click();
        break;
      case 'addText':
        await targetElement.sendKeys(text || '');
    }
  }
  async closeBrowser(): Promise<void> {
    await this.driver.quit();
  }

  getCssElementCondition(cssSelector: string): WebElementCondition {
    return until.elementLocated(By.css(cssSelector));
  }

  async clickDropDownItemByCss(targetDropdownMenuParam: getDropdownItemByCssParam): Promise<void> {
    const { dropdownCssSelector, dropdownItemCssSelector } = targetDropdownMenuParam;

    await this.waitCssElement(dropdownCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownCssSelector,
    });

    await this.waitCssElement(dropdownItemCssSelector);

    await this.elementAction({
      type: 'click',
      cssSelector: dropdownItemCssSelector,
    });
  }

  async isElementContainThisText(checkElementTextParam: CheckElementTextParam): Promise<boolean> {
    const { targetElementCssSelector, text } = checkElementTextParam;
    const targetElement = this.getElementByCss(targetElementCssSelector);
    if (!targetElement) {
      throw Error('element does not exist');
    }
    return (await targetElement.getText()).trim() === text.trim();
  }
}

export { PageDriverController };
