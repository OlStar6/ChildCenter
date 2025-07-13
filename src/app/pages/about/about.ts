import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink, CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  advantages = [
    {
      icon: 'fas fa-shield-alt',
      title: 'Безопасность',
      description: 'Все помещения оборудованы по высшим стандартам безопасности'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Развитие',
      description: 'Программы разработаны при участии детских психологов'
    },
    {
      icon: 'fas fa-smile',
      title: 'Радость',
      description: 'Более 95% детей хотят вернуться к нам снова'
    },
    {
      icon: 'fas fa-award',
      title: 'Опыт',
      description: '5 лет успешной работы в индустрии детских развлечений'
    }
  ];

  // Реквизиты организации
  companyDetails = {
    name: 'ООО "Детский Центр Развлечений"',
    address: 'г. Радостный, ул. Праздничная, д. 15',
    phone: '123-123',
    email: 'info@center-razvlecheniy.ru',
    inn: '1234567891',
    kpp: '123456789',
    
  };

  // Статистика центра
  statistics = [
    { value: '5+', label: 'лет работы' },
    { value: '5000+', label: 'довольных детей' },
    { value: '50+', label: 'проведенных праздников' },
    { value: '10+', label: 'профессиональных аниматоров' }
  ];
}

