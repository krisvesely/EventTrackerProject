export class Project {
  id: number;
	referenceNumber: number;
  title: string | null;
	client: string | null;
  isActive: boolean;
	contractPhase: string | null;
	workingPhase: string | null;
  phaseStatus: string | null;
  fee: number;
  createdAt: string | null;
  updatedAt: string | null;
	note: string | null;

  constructor(
  id: number = 0,
	referenceNumber: number = 1000,
  title: string | null = null,
	client: string | null = null,
  isActive: boolean = false,
	contractPhase: string | null = null,
	workingPhase: string | null = null,
  phaseStatus: string | null = null,
  fee: number = 0,
  createdAt: string | null = null,
  updatedAt: string | null = null,
	note: string | null = null
  ) {
    this.id = id;
    this.referenceNumber = referenceNumber;
    this.title = title;
    this.client = client;
    this.isActive = isActive;
    this.contractPhase = contractPhase;
    this.workingPhase = workingPhase;
    this.phaseStatus = phaseStatus;
    this.fee = fee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.note = note;
  }
}
