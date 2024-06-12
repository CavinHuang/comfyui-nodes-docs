---
tags:
- LLM
- LlamaIndex
---

# ∞ Input to Documents
## Documentation
- Class name: `LLMInputToDocuments`
- Category: `SALT/Language Toolkit/Documents`
- Output node: `False`

The node is designed to transform input data into a structured document format, potentially incorporating additional information and supporting concatenation of inputs for enhanced document creation.
## Input types
### Required
- **`input_data`**
    - Represents the primary data to be transformed into document format, serving as the core content for the document creation process.
    - Comfy dtype: `*`
    - Python dtype: `str`
### Optional
- **`extra_info`**
    - Optional JSON-formatted string to include as metadata in the document, allowing for the enrichment of the document with additional context or information.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`concat_input`**
    - A boolean flag indicating whether to concatenate input data into a single document or treat each input as a separate document, affecting the structure and granularity of the resulting documents.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`documents`**
    - Comfy dtype: `DOCUMENT`
    - The transformed input data into a structured document or documents, enriched with optional metadata and adjusted according to the concatenation setting.
    - Python dtype: `Tuple[List[Document]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMInputToDocuments:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_data": (WILDCARD,),
            },
            "optional": {
                "extra_info": ("STRING", {"default": "{}"}),
                "concat_input": ("BOOLEAN", {"default": False})
            }
        }

    RETURN_TYPES = ("DOCUMENT",)
    RETURN_NAMES = ("documents",)

    FUNCTION = "to_documents"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Documents"

    def to_documents(self, input_data, extra_info="{}", concat_input=False):
        documents = []

        # Try to parse extra_info
        try:
            extra_info = json.loads(extra_info) if extra_info.strip() else {}
        except json.JSONDecodeError:
            print("Invalid JSON for `extra_info` supplied, defaulting to empty `extra_info` dict.")
            extra_info = {}

        if not isinstance(extra_info, dict):
            print("Failed to decode `extra_info`, defaulting to empty `extra_info` dict.")
            extra_info = {}

        # Dict to string doc
        if isinstance(input_data, dict) and concat_input:
            doc_text = "\n".join(f"{key}: {value}" for key, value in input_data.items())
            documents.append(Document(text=doc_text, metadata={"source_type": "dict", **extra_info}))

        elif isinstance(input_data, dict):
            for key, value in input_data.items():
                doc_text = f"{key}: {value}"
                documents.append(Document(text=doc_text, metadata={"source_type": "dict", **extra_info}))

        # List to string doc
        elif isinstance(input_data, list) and concat_input:
            doc_text = "\n".join(str(item) for item in input_data)
            documents.append(Document(text=doc_text, metadata={"source_type": "list", **extra_info}))

        elif isinstance(input_data, list):
            for item in input_data:
                doc_text = str(item)
                documents.append(Document(text=doc_text, metadata={"source_type": "list", **extra_info}))

        # Primitive to string doc
        elif isinstance(input_data, (str, int, float)):
            documents.append(Document(text=str(input_data), metadata={"source_type": type(input_data).__name__, **extra_info}))

        elif isinstance(input_data, torch.Tensor):

            temp = folder_paths.get_temp_directory()
            os.makedirs(temp, exist_ok=True)
            output_path = os.path.join(temp, str(uuid.uuid4()))
            os.makedirs(output_path, exist_ok=True)

            images = []
            image_paths = []
            for img in input_data:
                if img.shape[-1] == 3:
                    images.append(self.tensor2pil(img))
                else:
                    images.append(self.mask2pil(img))

            if not images:
                raise ValueError("Invalid image tensor input provided to convert to PIL!")
            
            try:
                for index, pil_image in enumerate(images):
                    file_prefix = "llm_image_input_"
                    file_ext = ".jpeg"
                    filename = f"{file_prefix}_{index:04d}{file_ext}"
                    image_path = os.path.join(output_path, filename)
                    pil_image.save(image_path, quality=100)
                    image_paths.append(image_path)

                    if os.path.exists(image_path):
                        print(f"[SALT] Saved LLM document image to `{image_path}`")
                    else:
                        print(f"[SALT] Unable to save LLM document image to `{image_path}`")

            except Exception as e:
                raise e
            
            reader = SimpleDirectoryReader(
                input_dir=output_path,
                exclude_hidden=True,
                recursive=False
            )
            
            documents = reader.load_data()

            if not documents:
                raise ValueError("No documents found in the specified directory.")
            
        else:
            raise ValueError(f"LLMInputToDocuments does not support type `{type(input_data).__name__}`. Please provide: dict, list, str, int, float.")

        pprint(documents, indent=4)

        return (documents,)
    
    def tensor2pil(self, x):
        return Image.fromarray(np.clip(255. * x.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
    
    def mask2pil(self, x):
        x = 1. - x
        if x.ndim != 3:
            print(f"Expected a 3D tensor ([N, H, W]). Got {x.ndim} dimensions.")
            x = x.unsqueeze(0) 
        x_np = x.cpu().numpy()
        if x_np.ndim != 3:
            x_np = np.expand_dims(x_np, axis=0) 
        return Image.fromarray(np.clip(255. * x_np[0, :, :], 0, 255).astype(np.uint8), 'L')

```
