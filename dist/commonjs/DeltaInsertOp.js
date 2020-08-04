"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var value_types_1 = require("./value-types");
var InsertData_1 = require("./InsertData");
var lodash_isequal_1 = __importDefault(require("lodash.isequal"));
var DeltaInsertOp = (function () {
    function DeltaInsertOp(insertVal, attrs) {
        if (typeof insertVal === 'string') {
            insertVal = new InsertData_1.InsertDataQuill(value_types_1.DataType.Text, insertVal + '');
        }
        this.insert = insertVal;
        this.attributes = attrs || {};
    }
    DeltaInsertOp.createNewLineOp = function () {
        return new DeltaInsertOp(value_types_1.NewLine);
    };
    DeltaInsertOp.prototype.isContainerBlock = function () {
        return (this.isBlockquote() ||
            this.isList() ||
            this.isTableCellLine() ||
            this.isTableCol() ||
            this.isCodeBlock() ||
            this.isHeader() ||
            this.isBlockAttribute() ||
            this.isCustomTextBlock());
    };
    DeltaInsertOp.prototype.isBlockAttribute = function () {
        var attrs = this.attributes;
        return !!(attrs.align || attrs.direction || attrs.indent);
    };
    DeltaInsertOp.prototype.isBlockquote = function () {
        return !!this.attributes.blockquote;
    };
    DeltaInsertOp.prototype.isHeader = function () {
        return !!this.attributes.header;
    };
    DeltaInsertOp.prototype.isTableCellLine = function () {
        return !!this.attributes['table-cell-line'];
    };
    DeltaInsertOp.prototype.isTableCol = function () {
        return !!this.attributes['table-col'];
    };
    DeltaInsertOp.prototype.isSameHeaderAs = function (op) {
        return op.attributes.header === this.attributes.header && this.isHeader();
    };
    DeltaInsertOp.prototype.hasSameAdiAs = function (op) {
        return (this.attributes.align === op.attributes.align &&
            this.attributes.direction === op.attributes.direction &&
            this.attributes.indent === op.attributes.indent);
    };
    DeltaInsertOp.prototype.hasSameIndentationAs = function (op) {
        return this.attributes.indent === op.attributes.indent;
    };
    DeltaInsertOp.prototype.hasSameAttr = function (op) {
        return lodash_isequal_1.default(this.attributes, op.attributes);
    };
    DeltaInsertOp.prototype.hasHigherIndentThan = function (op) {
        return ((Number(this.attributes.indent) || 0) >
            (Number(op.attributes.indent) || 0));
    };
    DeltaInsertOp.prototype.isInline = function () {
        return !(this.isContainerBlock() ||
            this.isVideo() ||
            this.isCustomEmbedBlock());
    };
    DeltaInsertOp.prototype.isCodeBlock = function () {
        return !!this.attributes['code-block'];
    };
    DeltaInsertOp.prototype.hasSameLangAs = function (op) {
        return this.attributes['code-block'] === op.attributes['code-block'];
    };
    DeltaInsertOp.prototype.isJustNewline = function () {
        return this.insert.value === value_types_1.NewLine;
    };
    DeltaInsertOp.prototype.isList = function () {
        return (this.isOrderedList() ||
            this.isBulletList() ||
            this.isCheckedList() ||
            this.isToggledList() ||
            this.isUncheckedList());
    };
    DeltaInsertOp.prototype.isOrderedList = function () {
        return (!!this.attributes.list && this.attributes.list.list === value_types_1.ListType.Ordered);
    };
    DeltaInsertOp.prototype.isBulletList = function () {
        return (!!this.attributes.list && this.attributes.list.list === value_types_1.ListType.Bullet);
    };
    DeltaInsertOp.prototype.isCheckedList = function () {
        return (!!this.attributes.list && this.attributes.list.list === value_types_1.ListType.Checked);
    };
    DeltaInsertOp.prototype.isToggledList = function () {
        return (!!this.attributes.list && this.attributes.list.list === value_types_1.ListType.Toggled);
    };
    DeltaInsertOp.prototype.isUncheckedList = function () {
        return (!!this.attributes.list &&
            this.attributes.list.list === value_types_1.ListType.Unchecked);
    };
    DeltaInsertOp.prototype.isACheckList = function () {
        return (!!this.attributes.list &&
            (this.attributes.list.list == value_types_1.ListType.Unchecked ||
                this.attributes.list.list === value_types_1.ListType.Checked));
    };
    DeltaInsertOp.prototype.isSameListAs = function (op) {
        return (!!op.attributes.list &&
            (this.attributes.list.list === op.attributes.list.list ||
                (op.isACheckList() && this.isACheckList())) &&
            this.attributes.list.cell === op.attributes.list.cell);
    };
    DeltaInsertOp.prototype.isSameTableCellAs = function (op) {
        return ((!!op.isTableCellLine() &&
            this.isTableCellLine() &&
            !!this.attributes['table-cell-line'] &&
            !!op.attributes['table-cell-line'] &&
            this.attributes['table-cell-line'].cell ===
                op.attributes['table-cell-line'].cell) ||
            (op.isList() &&
                this.isTableCellLine() &&
                !!this.attributes['table-cell-line'] &&
                !!op.attributes['list'] &&
                this.attributes['table-cell-line'].cell ===
                    op.attributes['list'].cell) ||
            (op.isTableCellLine() &&
                this.isList() &&
                !!op.attributes['table-cell-line'] &&
                !!this.attributes['list'] &&
                op.attributes['table-cell-line'].cell ===
                    this.attributes['list'].cell) ||
            (op.isList() &&
                this.isList() &&
                !!this.attributes['list'] &&
                !!op.attributes['list'] &&
                this.attributes['list'].cell === op.attributes['list'].cell));
    };
    DeltaInsertOp.prototype.isText = function () {
        return this.insert.type === value_types_1.DataType.Text;
    };
    DeltaInsertOp.prototype.isImage = function () {
        return this.insert.type === value_types_1.DataType.Image;
    };
    DeltaInsertOp.prototype.isFormula = function () {
        return this.insert.type === value_types_1.DataType.Formula;
    };
    DeltaInsertOp.prototype.isVideo = function () {
        return this.insert.type === value_types_1.DataType.Video;
    };
    DeltaInsertOp.prototype.isLink = function () {
        return this.isText() && !!this.attributes.link;
    };
    DeltaInsertOp.prototype.isCustomEmbed = function () {
        return this.insert instanceof InsertData_1.InsertDataCustom;
    };
    DeltaInsertOp.prototype.isCustomEmbedBlock = function () {
        return this.isCustomEmbed() && !!this.attributes.renderAsBlock;
    };
    DeltaInsertOp.prototype.isCustomTextBlock = function () {
        return this.isText() && !!this.attributes.renderAsBlock;
    };
    DeltaInsertOp.prototype.isMentions = function () {
        return this.isText() && !!this.attributes.mentions;
    };
    return DeltaInsertOp;
}());
exports.DeltaInsertOp = DeltaInsertOp;
