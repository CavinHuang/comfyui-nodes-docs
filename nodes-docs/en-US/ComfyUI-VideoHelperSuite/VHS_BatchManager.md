---
tags:
- Multimedia
- VideoHelperSuite
---

# Meta Batch Manager 🎥🅥🅗🅢
## Documentation
- Class name: `VHS_BatchManager`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_BatchManager node is designed to manage and orchestrate batch processing tasks within the Video Helper Suite, facilitating efficient handling and manipulation of video-related data in batched operations.
## Input types
### Required
- **`frames_per_batch`**
    - Specifies the number of frames to be processed per batch, controlling the granularity of batch processing and affecting performance and resource utilization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`meta_batch`**
    - Comfy dtype: `VHS_BatchManager`
    - Represents the managed batch of video processing tasks, encapsulating the state and progress of batch operations.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class BatchManager:
    def __init__(self, frames_per_batch=-1):
        self.frames_per_batch = frames_per_batch
        self.inputs = {}
        self.outputs = {}
        self.unique_id = None
        self.has_closed_inputs = False
    def reset(self):
        self.close_inputs()
        for key in self.outputs:
            if getattr(self.outputs[key][-1], "gi_suspended", False):
                try:
                    self.outputs[key][-1].send(None)
                except StopIteration:
                    pass
        self.__init__(self.frames_per_batch)
    def has_open_inputs(self):
        return len(self.inputs) > 0
    def close_inputs(self):
        for key in self.inputs:
            if getattr(self.inputs[key][-1], "gi_suspended", False):
                try:
                    self.inputs[key][-1].send(1)
                except StopIteration:
                    pass
        self.inputs = {}

    @classmethod
    def INPUT_TYPES(s):
        return {
                "required": {
                    "frames_per_batch": ("INT", {"default": 16, "min": 1, "max": 128, "step": 1})
                    },
                "hidden": {
                    "prompt": "PROMPT",
                    "unique_id": "UNIQUE_ID"
                },
                }

    RETURN_TYPES = ("VHS_BatchManager",)
    RETURN_NAMES = ("meta_batch",)
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"
    FUNCTION = "update_batch"

    def update_batch(self, frames_per_batch, prompt=None, unique_id=None):
        if unique_id is not None and prompt is not None:
            requeue = prompt[unique_id]['inputs'].get('requeue', 0)
        else:
            requeue = 0
        if requeue == 0:
            self.reset()
            self.frames_per_batch = frames_per_batch
            self.unique_id = unique_id
        #onExecuted seems to not be called unless some message is sent
        return (self,)

```
