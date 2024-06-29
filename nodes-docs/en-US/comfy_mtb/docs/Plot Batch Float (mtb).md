---
tags:
- FloatData
---

# Plot Batch Float (mtb)
## Documentation
- Class name: `Plot Batch Float (mtb)`
- Category: `mtb/batch`
- Output node: `False`

The MTB_PlotBatchFloat node is designed for visualizing batches of floating-point numbers as images. It generates plots based on the provided float values, allowing for a graphical representation of data distributions or patterns.
## Input types
### Required
- **`width`**
    - Specifies the width of the generated plot image. Affects the resolution and size of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated plot image. Influences the resolution and size of the output visualization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`point_size`**
    - Determines the size of each point in the plot. Larger values produce bigger points, enhancing visibility but potentially reducing clarity in dense areas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`seed`**
    - A seed value for random number generation, ensuring reproducibility of the plot's layout when using random elements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_at_zero`**
    - A boolean flag that, when true, forces the plot's axis to start at zero, potentially altering the plot's scale and appearance.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`plot`**
    - Comfy dtype: `IMAGE`
    - The generated plot image, visualizing the input float values as a graphical representation.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_PlotBatchFloat:
    """Plot floats"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "width": ("INT", {"default": 768}),
                "height": ("INT", {"default": 768}),
                "point_size": ("INT", {"default": 4}),
                "seed": ("INT", {"default": 1}),
                "start_at_zero": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("plot",)
    FUNCTION = "plot"
    CATEGORY = "mtb/batch"

    def plot(
        self,
        width: int,
        height: int,
        point_size: int,
        seed: int,
        start_at_zero: bool,
        interactive_backend: bool = False,
        **kwargs,
    ):
        import matplotlib

        # NOTE: This is for notebook usage or tests, i.e not exposed to comfy that should always use Agg
        if not interactive_backend:
            matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        fig, ax = plt.subplots(figsize=(width / 100, height / 100), dpi=100)
        fig.set_edgecolor("black")
        fig.patch.set_facecolor("#2e2e2e")
        # Setting background color and grid
        ax.set_facecolor("#2e2e2e")  # Dark gray background
        ax.grid(color="gray", linestyle="-", linewidth=0.5, alpha=0.5)

        # Finding global min and max across all lists for scaling the plot
        all_values = [value for values in kwargs.values() for value in values]
        global_min = min(all_values)
        global_max = max(all_values)

        y_padding = 0.05 * (global_max - global_min)
        ax.set_ylim(global_min - y_padding, global_max + y_padding)

        max_length = max(len(values) for values in kwargs.values())
        if start_at_zero:
            x_values = np.linspace(0, max_length - 1, max_length)
        else:
            x_values = np.linspace(1, max_length, max_length)

        ax.set_xlim(1, max_length)  # Set X-axis limits
        np.random.seed(seed)
        colors = np.random.rand(len(kwargs), 3)  # Generate random RGB values
        for color, (label, values) in zip(colors, kwargs.items()):
            ax.plot(x_values[: len(values)], values, label=label, color=color)
        ax.legend(
            title="Legend",
            title_fontsize="large",
            fontsize="medium",
            edgecolor="black",
            loc="best",
        )

        # Setting labels and title
        ax.set_xlabel("Time", fontsize="large", color="white")
        ax.set_ylabel("Value", fontsize="large", color="white")
        ax.set_title(
            "Plot of Values over Time", fontsize="x-large", color="white"
        )

        # Adjusting tick colors to be visible on dark background
        ax.tick_params(colors="white")

        # Changing color of the axes border
        for _, spine in ax.spines.items():
            spine.set_edgecolor("white")

        # Rendering the plot into a NumPy array
        buf = BytesIO()
        plt.savefig(buf, format="png", bbox_inches="tight")
        buf.seek(0)
        image = Image.open(buf)
        plt.close(fig)  # Closing the figure to free up memory

        return (pil2tensor(image),)

    def draw_point(self, image, point, color, point_size):
        x, y = point
        y = image.shape[0] - 1 - y  # Invert Y-coordinate
        half_size = point_size // 2
        x_start, x_end = (
            max(0, x - half_size),
            min(image.shape[1], x + half_size + 1),
        )
        y_start, y_end = (
            max(0, y - half_size),
            min(image.shape[0], y + half_size + 1),
        )
        image[y_start:y_end, x_start:x_end] = color

    def draw_line(self, image, start, end, color):
        x1, y1 = start
        x2, y2 = end

        # Invert Y-coordinate
        y1 = image.shape[0] - 1 - y1
        y2 = image.shape[0] - 1 - y2

        dx = x2 - x1
        dy = y2 - y1
        is_steep = abs(dy) > abs(dx)
        if is_steep:
            x1, y1 = y1, x1
            x2, y2 = y2, x2
        swapped = False
        if x1 > x2:
            x1, x2 = x2, x1
            y1, y2 = y2, y1
            swapped = True
        dx = x2 - x1
        dy = y2 - y1
        error = int(dx / 2.0)
        y = y1
        ystep = None
        if y1 < y2:
            ystep = 1
        else:
            ystep = -1
        for x in range(x1, x2 + 1):
            coord = (y, x) if is_steep else (x, y)
            image[coord] = color
            error -= abs(dy)
            if error < 0:
                y += ystep
                error += dx
        if swapped:
            image[(x1, y1)] = color
            image[(x2, y2)] = color

```
