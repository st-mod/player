export const main=`.player{
    position: relative;
}
.player>video{
    display: block;
    width: 100%;
}
.player>.tool-bar{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, var(--color-bg), 75%, transparent);
    padding: var(--length-gap);
}
.player>.tool-bar>div{
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--length-gap);
}
.player>.tool-bar>div>.number-bar{
    flex-grow: 1;
}
.player>.tool-bar>div>.number-bar.time:before {
    display: none;
}`
export const all=main