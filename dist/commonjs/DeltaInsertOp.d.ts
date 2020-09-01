import { IOpAttributes } from './OpAttributeSanitizer';
import { InsertData } from './InsertData';
declare class DeltaInsertOp {
  readonly insert: InsertData;
  readonly attributes: IOpAttributes;
  constructor(insertVal: InsertData | string, attrs?: IOpAttributes);
  static createNewLineOp(): DeltaInsertOp;
  isContainerBlock(): boolean;
  isBlockAttribute(): boolean;
  isBlockquote(): boolean;
  isHeader(): boolean;
  isTableCellLine(): boolean;
  isTableCol(): boolean;
  isSameHeaderAs(op: DeltaInsertOp): boolean;
  hasSameAdiAs(op: DeltaInsertOp): boolean;
  hasSameIndentationAs(op: DeltaInsertOp): boolean;
  hasSameAttr(op: DeltaInsertOp): boolean;
  hasHigherIndentThan(op: DeltaInsertOp): boolean;
  isInline(): boolean;
  isCodeBlock(): boolean;
  hasSameLangAs(op: DeltaInsertOp): boolean;
  isJustNewline(): boolean;
  isList(): boolean;
  isOrderedList(): boolean;
  isBulletList(): boolean;
  isCheckedList(): boolean;
  isToggledList(): boolean;
  isNoneTypeList(): boolean;
  isUncheckedList(): boolean;
  isACheckList(): boolean;
  isSameListAs(op: DeltaInsertOp): boolean;
  isSameTableCellAs(op: DeltaInsertOp): boolean;
  isText(): boolean;
  isImage(): boolean;
  isFormula(): boolean;
  isVideo(): boolean;
  isLink(): boolean;
  isCustomEmbed(): boolean;
  isCustomEmbedBlock(): boolean;
  isCustomTextBlock(): boolean;
  isMentions(): boolean;
}
export { DeltaInsertOp };
