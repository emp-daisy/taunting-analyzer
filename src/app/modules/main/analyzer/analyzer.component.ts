import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import AgentFacade from "src/app/core/facades/agent.facade";
import CallFacade from "src/app/core/facades/call.facade";
import Script from "src/app/core/models/script.model";

import TemplateService from "src/app/core/services/template.service";

@Component({
  selector: "app-analyzer",
  templateUrl: "./analyzer.component.html",
  styleUrls: ["./analyzer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
  @ViewChild("subHeader")
  private subHeader?: TemplateRef<any>;

  public dataSource: any[] = [];
  public dataSourceRep: any[] = [];

  hoveredSentence$ = new Subject<string|null>();

  callSelection = "";

  constructor(
    public agents: AgentFacade,
    public calls: CallFacade,
    private _tplService: TemplateService,
    private _router: Router
  ) {}

  public ngAfterViewInit(): void {
    this._tplService.register("subHeader", this.subHeader);
  }

  public ngOnInit(): void {
    this.dataSource = MOCK_DATA();
    this.dataSourceRep = MOCK_DATA().slice(-25);
    this.calls.setMatchingPercentage(38);
  }

  public selectAgent(event: any): void {
    this.agents.setActiveAgent(event?.value);
    this.selectCall(null)
    this.callSelection = "";
  }

  public selectCall(event: any): void {
    this.calls.selectCall(event);
  }

  public selectMatch(event: any): void {
    this.calls.setMatchingPercentage(event?.value);
  }

  public getHint(data: any) {
    if (!data.matching_line) return '';
    return `${(data.similarity||0) * 100}% matching with line #${
      data.matching_line
    } “${data.matching_sentence}”`;
  }

  public getSimilarity(data: Script[]) {
    return Math.ceil(
      (data.reduce(
        (acc: number, { similarity }) => acc + (similarity || 0),
        0
      ) /
        data.length) *
        100
    );
  }

  public onHoverSentence(data: any) {
    this.hoveredSentence$.next(data.matching_sentence);
  }
}

const MOCK_DATA = () => {
  const DATA: any[] = [];
  const SPEAKERS: string[] = ["Harvey", "Luke"];

  let currentTime = 30;

  for (let i = 0; i < 100; i++) {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime - min * 60);

    DATA.push({
      time: `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`,
      speaker: SPEAKERS[Math.floor(Math.random() * SPEAKERS.length)],
      sentence: `This is a sample sentence #${i + 1}`,
    });

    currentTime += Math.random() * 10 + 5;
  }

  return DATA;
};
