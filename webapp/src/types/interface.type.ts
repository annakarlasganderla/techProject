export type PageOrder = "ASC" | "DESC";

export interface IPageable {
	order: PageOrder;
	page: number;
	take: number;
}
