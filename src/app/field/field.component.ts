import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Player, Position } from '../../models/player.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent { 
  constructor() {
    this.connectedDropLists = this.formation.map((_, i) => `field-${i}`);
  }
  connectedDropLists: string[] = [];
  players: Player[] = [
    {id: 1, name: "Thibaut", surname: "Courtois", number: 1, position: ["GK"], photo: "assets/courtois.png"},
    {id: 2, name: "Ferlan", surname: "Mendy", number: 23, position: ["LB"], photo: "assets/mendy.jpg"},
    {id: 3, name: "Anton", surname: "Rudiger", number: 22, position: ["CB"], photo: "assets/rudiger.png"},
    {id: 4, name: "Raul", surname: "Asencio", number: 35, position: ["CB", "RB"], photo: "assets/asencio.png"},
    {id: 5, name: "Dani", surname: "Carvajal", number: 2, position: ["RB"], photo: "assets/carvajal.jpg"},
    {id: 6, name: "Luka", surname: "Modric", number: 10, position: ["CM"], photo: "assets/modric.jpg"},
    {id: 7, name: "Federico", surname: "Valverde", number: 8, position: ["CM"], photo: "assets/valverde.png"},
    {id: 8, name: "Jude", surname: "Bellingham", number: 5, position: ["CAM"], photo: "assets/bellingham.png"},
    {id: 9, name: "Vinicius", surname: "Junior", number: 7, position: ["LW", "ST"], photo: "assets/vini.jpeg"},
    {id: 10, name: "Kylian", surname: "Mbappe", number: 9, position: ["ST", "LW"], photo: "assets/mbappe.webp"},
    {id: 11, name: "Rodrygo", surname: "Silva de Goes", number: 11, position: ["RW"], photo: "assets/rodrygo.png"}
  ];
  formationPositions: string[] = ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CAM', 'CM', 'LW', 'ST', 'RW'];

  field_players = Array(11).fill(null);
  
  formation: Position[] = [ // 4-3-3
    { x: 50, y: 85}, { x: 20, y: 70}, { x: 40, y: 70},
    { x: 60, y: 70}, { x: 80, y: 70}, { x: 30, y: 50},
    { x: 50, y: 40}, { x: 70, y: 50}, { x: 25, y: 25},
    { x: 50, y: 15}, { x: 75, y: 25}
  ];

  get availablePlayers() {
    return this.players.filter(player => !this.field_players.includes(player));
  }

  onDrop(event: CdkDragDrop<any[]>, positionIndex?: number) {
    if (positionIndex === undefined) return;
    
    if (event.previousContainer.id === 'players-list' && 
        event.container.id.startsWith('field-')) {
      
      const player = this.availablePlayers[event.previousIndex];
      
      if (this.field_players[positionIndex] !== null) {
        return;
      }
      this.field_players[positionIndex] = player;
      this.field_players = [...this.field_players];
    }
    else if (event.previousContainer.id.startsWith('field-') && 
             event.container.id.startsWith('field-')) {
      const prevPositionIndex = parseInt(event.previousContainer.id.split('-')[1]);
      if (this.field_players[positionIndex] !== null) {
        [this.field_players[prevPositionIndex], this.field_players[positionIndex]] =
        [this.field_players[positionIndex], this.field_players[prevPositionIndex]];
      } else {
        this.field_players[positionIndex] = this.field_players[prevPositionIndex];
        this.field_players[prevPositionIndex] = null;
      }
      this.field_players = [...this.field_players];
    }
  }

  getFormationPosition(index: number): string {
    return this.formationPositions[index] || '';
  }
  
  isPositionMismatch(index: number): boolean {
    const player = this.field_players[index];
    if (!player) return false;
    
    const formationPosition = this.formationPositions[index];
    return !player.position.includes(formationPosition)
  }

  removePlayer(positionIndex: number) {
    const removedPlayer = this.field_players[positionIndex];
    if (removedPlayer) {
      if (!this.players.some(p => p.name === removedPlayer.name)) {
        this.players.push(removedPlayer);
      }
      this.field_players[positionIndex] = null;
    }
  }
}
