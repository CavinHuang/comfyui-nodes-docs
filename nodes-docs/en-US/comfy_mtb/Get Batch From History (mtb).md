---
tags:
- Batch
- Image
---

# Get Batch From History (mtb)
## Documentation
- Class name: `Get Batch From History (mtb)`
- Category: `mtb/animation`
- Output node: `False`

The MTB_GetBatchFromHistory node is designed to retrieve a batch of data from a historical dataset based on specified parameters. It enables conditional fetching of data, allowing for dynamic data loading and manipulation within a pipeline.
## Input types
### Required
- **`enable`**
    - Determines whether the node should attempt to load data from history. If disabled, it can pass through an alternative image if provided.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`count`**
    - Specifies the number of historical data entries to retrieve. A count of 0 disables data loading.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset`**
    - Defines the starting point within the historical dataset from which to begin data retrieval, allowing for pagination or skipping entries.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`internal_count`**
    - A hacky parameter used to invalidate the node's cache, forcing a reload under certain conditions.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`passthrough_image`**
    - An optional image to pass through when data loading is disabled or the count is 0, providing a fallback mechanism.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The batch of images retrieved from history, or a zero tensor if no data is found or loading is disabled.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_GetBatchFromHistory:
    """Very experimental node to load images from the history of the server.

    Queue items without output are ignored in the count.
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "enable": ("BOOLEAN", {"default": True}),
                "count": ("INT", {"default": 1, "min": 0}),
                "offset": ("INT", {"default": 0, "min": -1e9, "max": 1e9}),
                "internal_count": ("INT", {"default": 0}),
            },
            "optional": {
                "passthrough_image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    CATEGORY = "mtb/animation"
    FUNCTION = "load_from_history"

    def load_from_history(
        self,
        *,
        enable=True,
        count=0,
        offset=0,
        internal_count=0,  # hacky way to invalidate the node
        passthrough_image=None,
    ):
        if not enable or count == 0:
            if passthrough_image is not None:
                log.debug("Using passthrough image")
                return (passthrough_image,)
            log.debug("Load from history is disabled for this iteration")
            return (torch.zeros(0),)
        frames = []

        base_url, port = get_server_info()

        history_url = f"http://{base_url}:{port}/history"
        log.debug(f"Fetching history from {history_url}")
        output = torch.zeros(0)
        with urllib.request.urlopen(history_url) as response:
            output = self.load_batch_frames(response, offset, count, frames)

        if output.size(0) == 0:
            log.warn("No output found in history")

        return (output,)

    def load_batch_frames(self, response, offset, count, frames):
        history = json.loads(response.read())

        output_images = []

        for run in history.values():
            for node_output in run["outputs"].values():
                if "images" in node_output:
                    for image in node_output["images"]:
                        image_data = get_image(
                            image["filename"],
                            image["subfolder"],
                            image["type"],
                        )
                        output_images.append(image_data)

        if not output_images:
            return torch.zeros(0)

        # Directly get desired range of images
        start_index = max(len(output_images) - offset - count, 0)
        end_index = len(output_images) - offset
        selected_images = output_images[start_index:end_index]

        frames = [Image.open(image) for image in selected_images]

        if not frames:
            return torch.zeros(0)
        elif len(frames) != count:
            log.warning(f"Expected {count} images, got {len(frames)} instead")

        return pil2tensor(frames)

```
