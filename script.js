// Отображение тултипов калькулятора
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});
// Калькулятор
/*
js-income = Ваш среднемесячный доход до вычета налогов
js-cost = Затраты на приобретение жилья
js-expanses = Расходы на уплату процентов по ипотеке
js-insurance = Страхование жизни
js-training = Обучение
js-training-child = Обучение ребенка
js-treatment = Лечение
js-treatment-expensive = Дорогостоящее лечение
js-sport = Спорт или фитнес
js-charity = Благотворительность
js-contributions = Дополнительные взносы в НПФ
js-contributions-iis = Взносы на индивидуальный инвестиционный счет (ИИС)
 
.calculator__info = Информация к итогу
.calculator__warning = Предупреждение
js-result = Вывод результата
*/
; (function () {
    const income = document.querySelector('#js-income'),
    cost = document.querySelector('#js-cost'),
    expanses = document.querySelector('#js-expanses'),
    insurance = document.querySelector('#js-insurance'),
    training = document.querySelector('#js-training'),
    trainingChild = document.querySelector('#js-training-child'),
    treatment = document.querySelector('#js-treatment'),
    treatmentExpensive = document.querySelector('#js-treatment-expensive'),
    sport = document.querySelector('#js-sport'),
    charity = document.querySelector('#js-charity'),
    contributions = document.querySelector('#js-contributions'),
    contributionsIis = document.querySelector('#js-contributions-iis'),
    info = document.querySelector('.calculator__info'),
    warning = document.querySelector('.calculator__warning'),
    result = document.querySelector('#js-result');
    let incomeValue = 0, // "Ваш среднемесячный доход до вычета налогов" value
    costValue = 0, // "Затраты на приобретение жилья" value
    expansesValue = 0, // "Расходы на уплату процентов по ипотеке" value
    insuranceValue = 0, // "Страхование жизни" value
    trainingValue = 0, // "Обучение" value
    trainingChildValue = 0, // "Обучение ребенка" value
    treatmentValue = 0, // "Лечение" value
    treatmentExpensiveValue = 0, // "Дорогостоящее лечение" value
    sportValue = 0, // "Спорт или фитнес" value
    charityValue = 0, // "Благотворительность" value
    contributionsValue = 0, // "Дополнительные взносы в НПФ" value
    contributionsIisValue = 0; // "Взносы на индивидуальный инвестиционный счет (ИИС)" value

    income.addEventListener('input', () => {
        if (income.value > 416666.67) {
            incomeValue = 416666.67 * 12 * 0.13;
            warning.textContent = "Ваш годовой доход превышает 5 млн. руб. Для получения точной суммы возврата обращайтесь к нашим налоговым юристам."
        } else {
            incomeValue = income.value * 12 * 0.13;
            warning.textContent = '';
        }
        updateResult();
    })
    cost.addEventListener('input', () => {
        if (cost.value > 2000000) {
            costValue = 2000000 * 0.13;
        } else {
            costValue = cost.value * 0.13;
        }
        updateResult();
    });
    expanses.addEventListener('input', () => {
        if (expanses.value > 3000000) {
            expansesValue = 3000000 * 0.13;
        } else {
            expansesValue = expanses.value * 0.13;
        }
        updateResult();
    });
    insurance.addEventListener('input', () => {
        if (insurance.value > 120000) {
            insuranceValue = 120000 * 0.13;
        } else {
            insuranceValue = insurance.value * 0.13;
        }
        updateResult();
    });
    training.addEventListener('input', () => {
        if (training.value > 120000) {
            trainingValue = 120000 * 0.13;
        } else {
            trainingValue = training.value * 0.13;
        }
        updateResult();
    });
    trainingChild.addEventListener('input', () => {
        if (trainingChild.value > 50000) {
            trainingChildValue = 50000 * 0.13;
        } else {
            trainingChildValue = trainingChild.value * 0.13;
        }
        updateResult();
    });
    treatment.addEventListener('input', () => {
        if (treatment.value > 120000) {
            treatmentValue = 120000 * 0.13;
        } else {
            treatmentValue = treatment.value * 0.13;
        }
        updateResult();
    });
    treatmentExpensive.addEventListener('input', () => {
        treatmentExpensiveValue = treatmentExpensive.value * 0.13;
        updateResult();
    });
    sport.addEventListener('input', () => {
        if (sport.value > 120000) {
            sportValue = 120000 * 0.13;
        } else {
            sportValue = sport.value * 0.13;
        }
        updateResult();
    });
    charity.addEventListener('input', () => {
        if ((income.value * 12 * 0.25) < charity.value) {
            charityValue = (income.value * 12 * 0.25) * 0.13;
        } else {
            charityValue = charity.value * 0.13;
        }
        updateResult();
    })
    contributions.addEventListener('input', () => {
        if (contributions.value > 120000) {
            contributionsValue = 120000 * 0.13;
        } else {
            contributionsValue = contributions.value * 0.13;
        }
        updateResult();
    });
    contributionsIis.addEventListener('input', () => {
        if (contributionsIis.value > 400000) {
            contributionsIisValue = 400000 * 0.13;
        } else {
            contributionsIisValue = contributionsIis.value * 0.13;
        }
        updateResult();
    });
    function updateResult() {
        if ((other() + limit()) >= incomeValue) {
            result.value = numberWithSpaces(incomeValue) + ' руб.';
        } else {
            result.value = numberWithSpaces(other() + limit()) + ' руб.';
        }
        info.style.display = 'block';
    }
    function limit() {
        let limitSum = 0;
        let limitVals = sum([treatmentValue, insuranceValue, contributionsValue, trainingValue, sportValue]);
        if (limitVals > 15600) {
            limitSum = 15600;
        } else {
            limitSum = limitVals;
        }
        return limitSum;
    }
    function other() {
        return sum([costValue, expansesValue, treatmentExpensiveValue, trainingChildValue, charityValue, contributionsIisValue]);
    }
    document.querySelector('.calculator__reset').addEventListener('click', () => {
        incomeValue = null,
            treatmentValue = null,
            insuranceValue = null,
            contributionsValue = null,
            trainingValue = null,
            sportValue = null,
            costValue = null,
            expansesValue = null,
            treatmentExpensiveValue = null,
            trainingChildValue = null,
            charityValue = null,
            contributionsIisValue = null,
            warning.textContent = '';
    })
})();
// Разделение числа на разряды и до 2 символов в дроби
function numberWithSpaces(x) {
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
// Сумма масива
function sum(arr) {
    return arr.reduce(add, 0);
    function add(accumulator, a) {
        return accumulator + a;
    }
}