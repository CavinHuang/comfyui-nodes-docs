# ∞ Append to Documents List
## Documentation
- Class name: `LLMDocumentListAppend`
- Category: `SALT/Language Toolkit/Documents`
- Output node: `False`

This node is designed to append a list of documents to an existing list of documents, optionally updating their metadata with additional information. It facilitates the dynamic expansion of document collections, allowing for the aggregation of data from multiple sources.
## Input types
### Required
- **`llm_documents`**
    - Represents the initial list of documents to which new documents will be appended. It plays a crucial role in the node's operation by serving as the base collection for aggregation.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `List[Document]`
- **`append_llm_documents`**
    - The list of new documents to be appended to the existing list. This parameter is essential for expanding the document collection with new entries.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `List[Document]`
### Optional
- **`extra_info`**
    - A JSON string containing additional metadata to be merged into the metadata of the documents being appended. This allows for the enrichment of document data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The updated list of documents after appending the new documents and optionally updating their metadata.
    - Python dtype: `List[Document]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMDocumentListAppend:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_documents": ("DOCUMENT",),
                "append_llm_documents": ("DOCUMENT",),
            },
            "optional": {
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT",)
    RETURN_NAMES = ("documents",)

    FUNCTION = "document_append"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Documents"

    def document_append(self, llm_documents, append_llm_documents, extra_info={}):
        extra_info = json.loads(extra_info)
        for doc in append_llm_documents:
            if isinstance(doc.metadata, dict):
                doc.metadata.update(extra_info)
            elif doc.metadata == None:
                doc.metadata = extra_info
            llm_documents.append(doc)
        return (llm_documents, )

```
