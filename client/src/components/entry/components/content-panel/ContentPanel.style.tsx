import styled from 'styled-components';

export const ContentPanelStyle = styled.div`
	display: flex;
	flex-direction: column;
	.account-panel {
		flex: 0 0 50px;
	}
	.bread-crumbs {
		flex: 0 0 30px;
	}
	.content-listing {
		flex: auto;
		display: grid;
	}
`;