---
tags:
- Image
---

# Pipe Batch Index
## Documentation
- Class name: `easy pipeBatchIndex`
- Category: `EasyUse/Pipe`
- Output node: `False`

The `easy pipeBatchIndex` node is designed to extract a specific batch of samples from a pipeline's sample collection, based on a given batch index and length. This functionality is crucial for processing or analyzing subsets of data within larger datasets, enabling targeted operations on specific segments of the sample collection.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline from which a batch of samples is to be extracted. It is essential for identifying the source collection of samples.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Dict[str, Any]`
- **`batch_index`**
    - Determines the starting index of the batch to be extracted from the pipeline. It allows for precise selection of data segments.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`length`**
    - Defines the number of samples to be extracted from the specified batch index. This parameter sets the size of the batch to be processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Returns a modified pipeline containing only the samples from the specified batch index and length. This enables focused analysis or processing of a particular data subset.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class pipeBatchIndex:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"pipe": ("PIPE_LINE",),
                             "batch_index": ("INT", {"default": 0, "min": 0, "max": 63}),
                             "length": ("INT", {"default": 1, "min": 1, "max": 64}),
                             },
                "hidden": {"my_unique_id": "UNIQUE_ID"},}

    RETURN_TYPES = ("PIPE_LINE",)
    RETURN_NAMES = ("pipe",)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Pipe"

    def doit(self, pipe, batch_index, length, my_unique_id=None):
        samples = pipe["samples"]
        new_samples, = LatentFromBatch().frombatch(samples, batch_index, length)
        new_pipe = {
            **pipe,
            "samples": new_samples
        }
        del pipe
        return (new_pipe,)

```
