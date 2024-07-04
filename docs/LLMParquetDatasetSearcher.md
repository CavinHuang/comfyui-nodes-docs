
# Documentation
- Class name: LLMParquetDatasetSearcher
- Category: SALT/Language Toolkit/Tools/Dataset
- Output node: False

这个节点旨在对存储在Parquet格式的大型数据集执行高级搜索操作。它利用语言模型来解释和执行复杂的查询，应用过滤器、相关性评分和并行处理，以有效地检索和排序基于查询意图的结果。

# Input types
## Required
- file_type
    - 指定要搜索的文件类型，如parquet、text、json、yaml、csv或excel，决定了数据提取和处理的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- path_or_url
    - 要搜索的文件的位置，可以是本地文件路径或URL，为搜索操作提供对数据集的访问。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- search_term
    - 在数据集中搜索的查询或关键词，指导搜索和过滤过程。
    - Comfy dtype: STRING
    - Python dtype: str
- exclude_terms
    - 从搜索结果中排除的术语，允许更精细和相关的结果。
    - Comfy dtype: STRING
    - Python dtype: str
- columns
    - 数据集中要搜索的特定列，实现有针对性的搜索并提高效率。
    - Comfy dtype: STRING
    - Python dtype: str
- case_sensitive
    - 确定搜索是否区分大小写，影响匹配过程。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- max_results
    - 返回的最大搜索结果数，控制搜索输出的范围。
    - Comfy dtype: INT
    - Python dtype: int
- term_relevancy_threshold
    - 相关性评分的阈值，基于与搜索词的相关性过滤结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- use_relevancy
    - 指示是否应对搜索结果应用相关性评分，提高结果质量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- min_length
    - 搜索结果的最小长度，过滤掉不符合此标准的结果。
    - Comfy dtype: INT
    - Python dtype: int
- max_length
    - 搜索结果的最大长度，确保结果在指定的大小范围内。
    - Comfy dtype: INT
    - Python dtype: int
- max_dynamic_retries
    - 在没有结果的情况下，应进行动态调整重试搜索的次数，提高找到相关数据的机会。
    - Comfy dtype: INT
    - Python dtype: int
- clean_content
    - 指定在搜索之前是否应清理或预处理内容，影响结果的准确性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- excel_sheet_position
    - 对于excel文件，指定要搜索的工作表，允许在多工作表文档中进行有针对性的数据提取。
    - Comfy dtype: INT
    - Python dtype: int
- recache
    - 确定是否应重新缓存数据，可能提高重复搜索的性能。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- condense_documents
    - 指示是否应压缩搜索结果，可能减少返回的数据量。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 搜索中随机操作的种子值，确保结果的可重现性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- results
    - Comfy dtype: STRING
    - 包含搜索结果的主要输出，包括相关的数据条目。
    - Python dtype: str
- results_list
    - Comfy dtype: LIST
    - 搜索结果的列表格式，提供另一种表示形式。
    - Python dtype: list
- documents
    - Comfy dtype: DOCUMENT
    - 从搜索结果派生的结构化文档，可能包括元数据和附加上下文。
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMParquetDatasetSearcher:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_type": (["parquet", "text", "json", "yaml", "csv", "excel"],),
                "path_or_url": ("STRING", {"placeholder": "Path to file or URL"}),
            },
            "optional": {
                "search_term": ("STRING", {"placeholder": "Enter search term"}),
                "exclude_terms": ("STRING", {"placeholder": "Terms to exclude, comma-separated"}),
                "columns": ("STRING", {"default": "*"}),
                "case_sensitive": ("BOOLEAN", {"default": False}),
                "max_results": ("INT", {"default": 10, "min": 1}),
                "term_relevancy_threshold": ("FLOAT", {"min": 0.0, "max": 1.0, "default": 0.25, "step": 0.01}),
                "use_relevancy": ("BOOLEAN", {"default": False}),
                #"num_threads": ("INT", {"default": 2}),
                "min_length": ("INT", {"min": 0, "max": 1023, "default": 0}),
                "max_length": ("INT", {"min": 3, "max": 1024, "default": 128}),
                "max_dynamic_retries": ("INT", {"default": 3}),
                "clean_content": ("BOOLEAN", {"default": False}),
                "excel_sheet_position": ("INT", {"min": 0, "default": "0"}),
                "recache": ("BOOLEAN", {"default": False}),
                "condense_documents": ("BOOLEAN", {"default": True}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("STRING", "LIST", "DOCUMENT")
    RETURN_NAMES = ("results", "results_list", "documents")
    OUTPUT_IS_LIST = (True, False, False)

    FUNCTION = "search_dataset"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Tools/Dataset"

    def search_dataset(self, path_or_url, file_type, search_term="", exclude_terms="", columns="*", case_sensitive=False, max_results=10,
                       term_relevancy_threshold=None, use_relevancy=False, num_threads=2, min_length=0, max_length=-1, max_dynamic_retries=0,
                       clean_content=False, seed=None, excel_sheet_position="0", condense_documents=True, recache=False):
        
        # Validate path or download file and return path
        path = resolve_path(path_or_url)

        reader = ParquetReader1D()
        if file_type == "parquet":
            reader.from_parquet(path)
        elif file_type == "text":
            reader.from_text(path, recache=recache)
        elif file_type == "json":
            reader.from_json(path, recache=recache)
        elif file_type == "yaml":
            reader.from_yaml(path, recache=recache)
        elif file_type == "csv":
            reader.from_csv(path, recache=recache)
        elif file_type == "excel":
            reader.from_excel(path, sheet_name=excel_sheet_position, recache=recache)

        results = reader.search(
            search_term=search_term,
            exclude_terms=exclude_terms,
            columns=[col.strip() for col in columns.split(',') if col] if columns else ["*"],
            max_results=max_results,
            case_sensitive=case_sensitive,
            term_relevancy_score=term_relevancy_threshold,
            num_threads=num_threads,
            min_length=min_length,
            max_length=max_length,
            max_dynamic_retries=max_dynamic_retries,
            parse_content=clean_content,
            seed=min(seed, 99999999),
            use_relevancy=use_relevancy
        )

        from pprint import pprint
        pprint(results, indent=4)

        results_list = []
        results_text = "Prompts:\n\n"
        documents = []
        for result in results:
            results_list.append(list(result.values())[0])
            if not condense_documents:
                documents.append(Document(text=list(result.values())[0], extra_info={}))
            else:
                results_text += str(list(result.values())[0]) + "\n\n"
        if condense_documents:
            documents = [Document(text=results_text, extra_info={})]

        return (results_list, results_list, documents,)

```
