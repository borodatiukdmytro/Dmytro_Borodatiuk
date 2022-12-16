import { By, until } from 'selenium-webdriver';
import { PageDriverController } from '../../page_driver/page_driver';

const MAX_SALARY_VALUE = 100000;

const MIN_SALARY_VALUE = 30000;

const PAGE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const Auth = async (driverController: PageDriverController): Promise<void> => {
  await driverController.elementAction({
    type: 'addText',
    text: 'Admin',
    cssSelector: 'input[name="username"]',
  });
  await driverController.elementAction({
    type: 'addText',
    text: 'admin123',
    cssSelector: 'input[name="password"]',
  });
  await driverController.elementAction({
    type: 'click',
    cssSelector: 'button[type="submit"]',
  });
};


const AddSalary = async (driverController: PageDriverController, randName: string): Promise<string[]> => {
  const adminMenuItemCssSelector = '.oxd-main-menu > .oxd-main-menu-item-wrapper:first-child > .oxd-main-menu-item';
  await driverController.waitCssElement(adminMenuItemCssSelector);

  await driverController.elementAction({
    type: 'click',
    cssSelector: adminMenuItemCssSelector,
  });
  await driverController.wait(until.elementLocated(By.css('.oxd-topbar-body-nav > ul')));
  await driverController.clickDropDownItemByCss({
    dropdownCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2)',
    dropdownItemCssSelector: '.oxd-topbar-body-nav > ul li:nth-child(2) > .oxd-dropdown-menu > li:nth-child(2)',
  });
  await driverController.waitCssElement('.orangehrm-header-container');
  await driverController.elementAction({
    cssSelector: '.orangehrm-header-container > div:last-child > button:last-child',
    type: 'click',
  });
  await driverController.waitCssElement('.oxd-input');

  await driverController.elementAction({
    type: 'addText',
    text: String(randName),
    cssSelector: '.oxd-form > .oxd-form-row .oxd-input',
  });

  await driverController.elementAction({
    type: 'click',
    cssSelector: 'button[type="submit"]',
  });

  await driverController.waitCssElement('.orangehrm-action-header');

  await driverController.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-action-header > button:last-child',
  });

  await driverController.waitCssElement('.orangehrm-card-container > .oxd-form');

  await driverController.waitCssElement('.oxd-select-wrapper');

  await driverController.clickDropDownItemByCss({
    dropdownCssSelector: '.oxd-select-wrapper',
    dropdownItemCssSelector: '.oxd-select-dropdown > div:nth-child(42)',
  });

  const sallaryBaseCssPath =
    '.orangehrm-card-container:nth-child(2) > .oxd-form .oxd-form-row:nth-child(2) > div:first-child';

  const minSalary = randomInt(MIN_SALARY_VALUE, MAX_SALARY_VALUE);

  const maxSalary = randomInt(minSalary, MAX_SALARY_VALUE);

  await driverController.elementAction({
    type: 'addText',
    text: String(minSalary),
    cssSelector: `${sallaryBaseCssPath} > div:first-child .oxd-input`,
  });

  await driverController.elementAction({
    type: 'addText',
    text: String(maxSalary),
    cssSelector: `${sallaryBaseCssPath} > div:last-child .oxd-input`,
  });

  await driverController.elementAction({
    type: 'click',
    cssSelector: '.orangehrm-card-container:nth-child(2) button[type="submit"]',
  });

  await driverController.waitCssElement('.oxd-table-card > .oxd-table-row:last-child > div:nth-child(3)');

  return [String(minSalary), String(maxSalary)];
};


export { Auth, AddSalary };
